import _ from 'lodash';
import mongoose from 'mongoose';

export default (query, params, Model) => {
    return query;
};

// export default (query, controllQuery = {}) => {
// 	const { select = '', populate = '', sort, page, limit, whereQueries = {}, deepSelects = {} } = controllQuery;
// 	if (!_.isEmpty(sort)) {
// 		query.sort(sort);
// 	}
// 	if (page && limit) {
// 		query.skip(_.parseInt(limit) * _.parseInt(page));
// 	} else if (page) {
// 		query.skip(_.parseInt(page));
// 	}
// 	if (limit) {
// 		query.limit(_.parseInt(limit));
// 	}
// 	if (!_.isEmpty(select)) {
// 		query.select(select.split(','));
// 	}
// 	if (!_.isEmpty(populate)) {
// 		_.split(populate, ',').map((path) => {
// 			const queryPopulate = {
// 				path,
// 				model: _.chain(path)
// 					.startCase()
// 					.split(' ')
// 					.last()
// 					.capitalize()
// 					.thru((str) => (_.endsWith(str, 's') ? str.slice(0, -1) : str))
// 					.value()
// 			};
// 			if (!_.isEmpty(deepSelects[path])) {
// 				queryPopulate.select = deepSelects[path].split(',');
// 			}
// 			query.populate(queryPopulate);
// 		});
// 	}
// 	if (!_.isEmpty(whereQueries)) {
// 		_.keys(whereQueries).map((key) => {
// 			const range = _.split(whereQueries[key], '~');
// 			if (range.length == 2) {
// 				if (_.isEmpty(range[0])) {
// 					query.where(key).lte(range[1]);
// 				} else if (_.isEmpty(range[1])) {
// 					query.where(key).gte(range[0]);
// 				} else {
// 					query.where(key).gte(range[0]).lte(range[1]);
// 				}
// 			} else {
// 				query.where(key, whereQueries[key]);
// 			}
// 		});
// 	}

// 	return query;
// };
