import _ from 'lodash';
export const pickByIdentity = (obj) => _.keys(_.pickBy(obj, _.identity)).join(' ');
