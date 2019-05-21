import _ from 'lodash';
export const restfulIField = {
    getList: { name: 'getList', url: '/', type: 'getList', method: 'get' },
    postItem: { name: 'postItem', url: '/', type: 'postItem', method: 'post' },
    getItem: { name: 'getItem', url: '/', type: 'getItem', method: 'get' },
    putItem: { name: 'putItem', url: '/', type: 'putItem', method: 'put' },
    deleteItem: { name: 'deleteItem', url: '/', type: 'removeItem', method: 'delete' },
    getSchema: { name: 'getSchema', url: '/schema', type: 'getSchema', method: 'get' }
};
export const restfulFields = _.values(restfulIField);
export const restfulReducer = (state, action = {}) => {
    switch (action.type) {
        case 'setList':
            return { ...state, ...action };
        case 'getList':
            return { ...state, ...action };
        case 'postItem':
            return { ...state, ...action, list: [ action.item, ...state.list ] };
        case 'getItem':
            return { ...state, ...action, list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)) };
        case 'putItem':
            return { ...state, ...action, list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)) };
        case 'deleteItem':
            return { ...state, ...action, list: _.reject(state.list, (item) => item.id === action.id) };
        case 'setItem':
            return { ...state, ...action, list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)) };
        case 'start':
            return { ...state, ...action, errorMessage: null };
        case 'fail':
            return {
                ...state,
                ...action,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};

export const initRestfulState = {
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
    list: [],
    item: {}
};

const initRespData = (data, objectName) => {
    if (data === null) {
        return {};
    } else if (data === false) {
        return { isFetchSuccess: false };
    } else if (data === true) {
        return { isFetchSuccess: true };
    } else if (Array.isArray(data)) {
        return { list: data };
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
                data.list = data[objectName + 's'] || [];
                delete data[objectName + 's'];
            }
        }
        return data;
    }
};

export const dispatchAction = (dispatch, { type, name, url = '', method }, apiAxios, objectName = 'item') => (config = {}) => {
    const { id, data, params, headers } = config;
    let URL = `${url}`;
    URL = id ? URL + id : URL;
    dispatch({ type: 'start', name, id, isSuccess: null, isLoading: true });
    return apiAxios({ url: URL, data, method, headers, params })
        .then((resp) => {
            let data = initRespData(resp.data, objectName);
            dispatch({ type, name, id, isSuccess: true, isLoading: false, ...data });
            return resp;
        })
        .catch((err) => {
            dispatch({ type: 'fail', name, id, isSuccess: false, isLoading: false, ...err.response.data });
            return err;
        });
};

export const Controller = (dispatch, feilds, apiAxios, routeName) => {
    const controller = {};
    feilds.map((field) => (controller[field.name] = dispatchAction(dispatch, field, apiAxios, routeName)));
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
