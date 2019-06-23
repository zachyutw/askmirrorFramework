const faker =require( 'faker');
const _ =require( 'lodash');
const createData = (schema, refs = {}) => {
    const keys = _.keys(schema);
    let _schema = schema;

    keys.map((key) => {
        if (key === 'id' || key === 'updatedAt' || key === 'createdAt' || key === 'isActived') {
            _schema = _.omit(_schema, key);
        } else if (schema[key] === 'String') {
            if (key === 'username') {
                _schema[key] = faker.internet.userName();
            } else if (key === 'password') {
                _schema[key] = 1234;
            } else if (key === 'email') {
                _schema[key] = faker.internet.email();
            } else {
                _schema[key] = faker.lorem.words(2);
            }
        } else if (key === 'image') {
            _schema[key] = {
                photoUrl: faker.image.imageUrl(300, 500, 'food', true, true),
                thumbUrl: faker.image.imageUrl(300, 500, 'food', true, true),
                tags: [ 'fake' ]
            };
        } else if (schema[key] === 'ObjectID') {
            if (refs[key]) {
                _schema[key] = refs[key];
            }
        } else {
            _schema = _.omit(_schema, key);
        }
    });
    // console.log(_schema);
    return _schema;
};

const factory = {};
factory.createData = createData;
module.exports =  factory;
