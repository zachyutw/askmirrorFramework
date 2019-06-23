import _ from 'lodash';
import base64ToBlobFunc from './base64ToBlob';
import copyStringToClipboardFunc from './copyStringToClipboard';
import snapVideoFunc from './snapVideo';
export const pickByIdentity = (meta) => _.keys(_.pickBy(meta, _.identity)).join(' ');
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const base64ToBlob = base64ToBlobFunc;
export const copyStringToClipboard = copyStringToClipboardFunc;
export const bodyRect = document.body.getBoundingClientRect();
export const getElementOffestTop = (el) => el.getBoundingClientRect().top - bodyRect.top;
export const snapVideo = snapVideoFunc;
export const centerSort = (fields = []) => {
    const reverseFields = _.reverse(fields.slice());
    let list = [];
    reverseFields.map((field, index) => {
        if (index % 2 === 0) {
            list.push(field);
        }
    });
    fields.map((field, index) => {
        if (index % 2 === 1) {
            list.push(field);
        }
    });
    return list;
};
