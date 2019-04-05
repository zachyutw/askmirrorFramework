import _ from 'lodash';
import mongoose from 'mongoose';
import faker from 'faker';
export const getQueryIds = (ids) => _.chain(ids).split(',').map((id) => mongoose.Types.ObjectId(id)).value();
export const getQuerySort = (sort) =>
    _.chain(sort)
        .split(',')
        .chunk(2)
        .reduce((prev, current) => {
            let value = current[1];
            if (value) {
                try {
                    value = JSON.parse(value);
                } catch (err) {}
                prev[current[0]] = value;
            }
            return prev;
        }, {})
        .value();
export const createObj = (key, value) => {
    const obj = {};
    const parts = key.split('.');
    if (parts.length === 1) {
        obj[parts[0]] = value;
    } else if (parts.length > 1) {
        const remainingParts = parts.slice(1, parts.length).join('.');
        obj[parts[0]] = createObj(remainingParts, value);
    }
    return obj;
};

export const queryItemPlugin = (query, params = {}) => {
    const { select } = params;
    if (select) {
        query.select(select.replace(',', ' '));
    }
    return query;
};
export const queryListPlugin = (query, params, Model) => {
    const { ids, sort, limit = 100, page, select, ...restParams } = params;
    if (sort) {
        const reduceSort = getQuerySort(sort);
        query.sort(reduceSort);
    } else {
        query.sort('-updatedAt');
    }
    if (ids) {
        const queryIds = getQueryIds(ids);
        query.where('_id').in(queryIds);
    }
    if (page) {
        query.skip(_.parseInt(limit) * _.parseInt(page));
    }
    if (select) {
        query.select(select.replace(',', ' '));
    }

    query.limit(_.parseInt(limit));
    _.keys(restParams).map((key) => {
        if (Model.schemaKeysMap[key] === 'Date' || Model.schemaKeysMap[key] === 'Number') {
            let parts = restParams[key].split('~');
            if (!_.isEmpty(parts[1]) && !_.isEmpty(parts[0])) {
                console.log('case 1');
                query.where(key).gte(parts[0]).lte(parts[1]);
            } else if (!_.isEmpty(parts[1]) && _.isEmpty(parts[0])) {
                console.log('case 2');
                query.where(key).lte(parts[1]);
            } else {
                console.log('case 3');
                query.where(key).gte(parts[0]);
            }
        } else {
            query.where(key, new RegExp(`^${restParams[key]}`, 'i'));
        }
    });
    return query;
};

export default (Model) => {
    Model.schemaKeysMap = _.keys(Model.schema.paths).reduce((prev, current) => {
        prev[current] = Model.schema.paths[current].instance;
        return prev;
    }, {});

    const getList = (params) => {
        let query = Model.find({});
        query = queryListPlugin(query, params, Model);
        return query.exec();
    };
    Model.getList = getList;
    const postList = async (datas, params = {}) => {
        const newDatas = await Promise.all(
            _.map(datas, (data) => {
                return Model(data);
            })
        );
        let listSaved = await Model.insertMany(newDatas);
        if (_.isError(listSaved)) {
            return listSaved;
        } else {
            listSaved = _.map(listSaved, (saved) => {
                if (_.isEmpty(params.selects)) {
                    return saved;
                } else {
                    return _.pick(saved, params.selects);
                }
            });
            return listSaved;
        }
    };
    Model.postList = postList;
    const deleteList = (params) => {
        const { all, ids } = params;
        if (all) {
            Model.collection.drop();
        } else if (!_.isArray(ids)) {
            let errors = [];
            ids.map((id) => {
                Model.remove({ _id: id }, (err) => {
                    errors.push(err);
                });
            });
            if (!_.isEmpty(errors)) {
                return ids;
            } else {
                return errors;
            }
        }
    };
    Model.deleteList = deleteList;

    const getListCount = (params) => {
        const count = Model.countDocuments(params);
        return count;
    };
    Model.getListCount = getListCount;
    const getSchema = () => {
        const paths = Model.schema.paths;
        let schemaType = _.keys(paths).reduce((prev, current) => {
            if (current.indexOf('.') > 0) {
                const indexName = _.head(current.split('.'));
                const obj = createObj(current, paths[current].instance);
                prev[indexName] = { ...prev[indexName], ...obj[indexName] };
                return prev;
            }
            return { ...prev, ...createObj(current, paths[current].instance) };
        }, {});
        schemaType.id = schemaType._id;
        schemaType = _.omit(schemaType, [ '_id', '__v' ]);

        return schemaType;
    };
    Model.getSchema = getSchema;
    const postItem = async (data, params) => {
        const model = Model(data);
        const doc = await model.save();
        let query = Model.findOne({ _id: doc._id });
        query = queryItemPlugin(query, params);
        return query.exec();
    };
    Model.postItem = postItem;
    const getItem = (conditions, params) => {
        let query = Model.findOne(conditions);
        query = queryItemPlugin(query, params);
        return query.exec();
    };
    Model.getItem = getItem;
    const putItem = (conditions, data, params) => {
        let query = Model.findOneAndUpdate(conditions, data);
        query.setOptions({ new: true });
        query = queryItemPlugin(query, params);
        return query.exec();
    };
    Model.putItem = putItem;
    const deleteItem = async (conditions, params) => {
        let doc = await Model.findOneAndRemove(conditions);
        return doc;
    };
    Model.deleteItem = deleteItem;
    const factoryCreate = (refs = {}) => {
        const schemaInstance = getSchema();
        const keys = _.keys(schemaInstance);
        let instance = schemaInstance;
        keys.map((key) => {
            if (key === 'id' || key === 'updatedAt' || key === 'createdAt' || key === 'isActived') {
                instance = _.omit(instance, key);
            } else if (instance[key] === 'String') {
                if (key === 'username') {
                    instance[key] = faker.internet.userName();
                } else if (key === 'password') {
                    instance[key] = 1234;
                } else if (key === 'email') {
                    instance[key] = faker.internet.email();
                } else {
                    instance[key] = faker.lorem.words(2);
                }
            } else if (key === 'image') {
                instance[key] = {
                    photoUrl: faker.image.imageUrl(300, 500, 'food', true, true),
                    thumbUrl: faker.image.imageUrl(300, 500, 'food', true, true),
                    tags: [ 'fake' ]
                };
            } else if (instance[key] === 'ObjectID') {
                if (refs[key]) {
                    instance[key] = refs[key];
                }
            } else {
                instance = _.omit(instance, key);
            }
        });

        return instance;
    };
    Model.factoryCreate = factoryCreate;
    Model.schema.set('toJSON', {
        transform: function (doc, ret, options){
            console.log(doc);
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    Model.schema.set('toObject', { getters: true });

    return Model;
};
