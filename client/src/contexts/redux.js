import _ from 'lodash';
export const restfulIField = {
    getItems: { name: 'getItems', url: '/', type: 'getItems', method: 'get' },
    postItem: { name: 'postItem', url: '/', type: 'postItem', method: 'post' },
    getItem: { name: 'getItem', url: '/', type: 'getItem', method: 'get' },
    putItem: { name: 'putItem', url: '/', type: 'putItem', method: 'put' },
    deleteItem: { name: 'deleteItem', url: '/', type: 'removeItem', method: 'delete' },
    getSchema: { name: 'getSchema', url: '/schema', type: 'getSchema', method: 'get' }
};
export const restfulFields = _.values(restfulIField);

export const startCase = {};

export const restfulReducer = (state, action = {}) => {
    switch (action.type) {
        case 'setList':
            return { ...state, ...action };
        case 'getItems':
            return { ...state, ...action };
        case 'postItem':
            return { ...state, ...action, items: [ action.item, ...state.items ] };
        case 'getItem':
            return { ...state, ...action, items: _.map(state.items, (item) => (item.id === action.id ? action.item : item)) };
        case 'putItem':
            return { ...state, ...action, items: _.map(state.items, (item) => (item.id === action.id ? action.item : item)) };
        case 'deleteItem':
            return { ...state, ...action, items: _.reject(state.items, (item) => item.id === action.id) };
        case 'setItem':
            return { ...state, ...action, items: _.map(state.items, (item) => (item.id === action.id ? action.item : item)) };
        case 'start':
            return { ...state, ...action };
        case 'fail':
            return { ...state, ...action };
        default:
            return state;
    }
};

export const initBasicState = {
    name: null,
    condition: { isLoading: false, isSuccess: null },
    error: { errorMessage: null }
};
export const initRestfulState = {
    name: null,
    condition: { isLoading: false, isSuccess: null },
    error: { errorMessage: null },
    id: null,
    items: [],
    item: {}
};

export const initRespData = (data, objectName) => {
    if (data === null) {
        return {};
    } else if (data === false) {
        return { isFetchSuccess: false };
    } else if (data === true) {
        return { isFetchSuccess: true };
    } else if (Array.isArray(data)) {
        return { items: data };
    } else if (data.redirect) {
        window.location = data.redirect;
    } else {
        if (data.type) {
            delete data.type;
        }
        if (data.name) {
            delete data.name;
        }
        if (objectName) {
            if (data[objectName]) {
                data.item = data[objectName] || {};
                if (data.item.id) {
                    data.id = data.item.id;
                }
                delete data[objectName];
            } else if (data[objectName + 's']) {
                data.items = data[objectName + 's'] || [];
                delete data[objectName + 's'];
            }
        }
        return data;
    }
};

export const initRespError = (err = {}) => {
    if (!err.response) {
        return { errorMessage: 'This error is provide by react app, plz check with server', status: -1 };
    } else if (!err.response.data) {
        return { errorMessage: 'Sever does not provide response data, plz check with server', status: -1 };
    } else {
        return err.response.data;
    }
};

const authHeaders = (propHeaders, required) => {
    let headers = {};
    if (required) {
        headers = { ...propHeaders, Authorization: 'Bearer ' + localStorage.getItem('accessToken') };
    } else {
        if (localStorage.getItem('accessToken')) {
            headers = { ...propHeaders, Authorization: 'Bearer ' + localStorage.getItem('accessToken') };
        } else if (localStorage.getItem('thirdToken')) {
            headers = { ...propHeaders, Authorization: 'Bearer ' + localStorage.getItem('thirdToken') };
        }
    }
    return headers;
};
const restfulURL = (fieldURL = '', id) => {
    let url = fieldURL;
    if (id) {
        url = url + id;
    }
    return url;
};
export const dispatchAction = (dispatch, { type, name, url = '', method }, apiAxios, objectName = 'item') => (config = {}) => {
    const { id, data, params, headers: propHeaders, required, isLoading = true } = config;
    let URL = restfulURL(url, id);
    const headers = authHeaders(propHeaders, required);
    dispatch({ type: 'start', id, condition: { isSuccess: null, isLoading }, error: {} });
    return apiAxios({ url: URL, data, method, headers, params })
        .then((resp) => {
            dispatch({ type, id, ...initRespData(resp.data, objectName), condition: { isSuccess: true, isLoading: false } });
            return resp;
        })
        .catch((err) => {
            dispatch({ type: 'fail', id, condition: { isSuccess: false, isLoading: false }, error: initRespError(err) });
            return err;
        });
};

export const Controller = (dispatch, feilds, apiAxios, objectName) => {
    const controller = {};
    feilds.map((field) => (controller[field.name] = dispatchAction(dispatch, field, apiAxios, objectName)));
    return controller;
};

export const localStoargeFeild = (fieldNames) => {
    return fieldNames.reduce((prev, name) => {
        try {
            prev[name] = JSON.parse(localStorage.getItem(name));
        } catch (err) {
            prev[name] = localStorage.getItem(name);
        }
        return prev;
    }, {});
};
