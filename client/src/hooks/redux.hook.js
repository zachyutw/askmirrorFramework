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
            return {
                ...state,
                name: action.name,
                isLoading: false,
                list: action.list || [],
                isSuccess: true
            };
        case 'getList':
            return {
                ...state,
                isLoading: false,
                list: action.list || [],
                name: action.name,
                isSuccess: true
            };
        case 'postItem':
            return {
                ...state,
                ...action,
                list: [ action.item, ...state.list ],
                name: action.name,
                isSuccess: true
            };
        case 'getItem':
            return {
                ...state,
                ...action,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)),
                name: action.name,
                isSuccess: true
            };
        case 'putItem':
            return {
                ...state,
                ...action,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)),
                name: action.name,
                isSuccess: true
            };
        case 'deleteItem':
            return {
                ...state,
                ...action,
                list: _.reject(state.list, (item) => item.id === action.id),
                name: action.name,
                isSuccess: true
            };
        case 'setItem':
            return {
                ...state,
                ...action,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item)),
                name: action.name,
                isSuccess: true
            };
        case 'start':
            return {
                ...state,
                name: action.name,
                isLoading: true,
                isSuccess: null,
                errorMessage: null
            };
        case 'fail':
            return {
                ...state,
                name: action.name,
                isLoading: false,
                isSuccess: false,
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

const initRespData = (data, ROUTE_NAME) => {
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
        if (ROUTE_NAME) {
            if (data[ROUTE_NAME]) {
                data.item = data[ROUTE_NAME];
                if (data[ROUTE_NAME].id) {
                    data.id = data[ROUTE_NAME].id;
                }
            } else if (data[ROUTE_NAME + 's']) {
                data.list = data[ROUTE_NAME + 's'];
            }
        }
        return data;
    }
};

export const dispatchAction = (dispatch, { type, name, url = '', method }, apiAxios, ROUTE_NAME = '') => (config = {}) => {
    const { id, data, params, headers } = config;
    console.log(url);
    let URL = `${ROUTE_NAME ? '/' + ROUTE_NAME : ''}${url}`;
    URL = id ? URL + '/' + id : URL;
    dispatch({ type: 'start', name });
    return apiAxios({
        url: URL,
        data,
        method,
        headers,
        params
    })
        .then((resp) => {
            let data = initRespData(resp.data, ROUTE_NAME);
            dispatch({ type, name, id, ...data });
            return resp;
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: 'fail', name, ...err.response.data });
            return err;
        });
};

export const Controller = (dispatch, feilds, apiAxios, ROUTE_NAME) => {
    const controller = {};
    feilds.map((field) => (controller[field.name] = dispatchAction(dispatch, field, apiAxios, ROUTE_NAME)));
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
