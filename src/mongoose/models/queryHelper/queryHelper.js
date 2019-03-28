import _ from 'lodash';
const PAGINATE_MAX = 100;
export const orderByPass = (orderBy = 'price', direction = 'DESC') => {
	const _direction = {
		DESC: '',
		ASC: '-'
	};
	const direct = _direction[`${direction}`] || '';
	const _orderBy = {
		id: `${direct}createdAt`,
		price: `${direct}price`,
		distance: `${direct}availableDay`
	};
	let order = '';
	if (orderBy) {
		order = _orderBy[`${orderBy}`];
	}
	// console.log(order);
	return order;
};
export const skipPass = (pageLocationId, limit = PAGINATE_MAX) => {
	let skip = 0;
	if (pageLocationId) {
		skip = pageLocationId * limit;
	}
	return skip;
};
export const limitPass = (limit) => {
	let locallimit = PAGINATE_MAX;
	if (limit) {
		locallimit = limit;
	}
	return locallimit;
};

export const parseNumber = (num) => (_.isNumber(num) ? num : _.toNumber(num));
export const mediaTypesConvert = (hasVR, hasVideo) => {
	let mediaTypes = 0;
	if (hasVR && hasVideo) {
		mediaTypes = 3;
	} else if (!hasVR && hasVideo) {
		mediaTypes = 2;
	} else if (hasVR && !hasVideo) {
		mediaTypes = 1;
	} else {
		mediaTypes = 0;
	}
	return mediaTypes;
};
const queryHelper = { orderByPass, skipPass, limitPass, parseNumber, mediaTypesConvert };
export default queryHelper;
