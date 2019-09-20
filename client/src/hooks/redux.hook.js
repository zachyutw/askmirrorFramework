import _ from 'lodash';
import axios from 'axios';
export const restfulIField = {
    getItems: { name: 'getItems', url: '/', type: 'getItems', method: 'get' },
    postItem: { name: 'postItem', url: '/', type: 'postItem', method: 'post' },
    getItem: { name: 'getItem', url: '/', type: 'getItem', method: 'get' },
    putItem: { name: 'putItem', url: '/', type: 'putItem', method: 'put' },
    deleteItem: { name: 'deleteItem', url: '/', type: 'removeItem', method: 'delete' },
    getSchema: { name: 'getSchema', url: '/schema', type: 'getSchema', method: 'get' },
    getItemsLoad: { name: 'getItemsLoad', url: '/', type: 'getItemsLoad', method: 'get' }
};
export const restfulFields = _.values(restfulIField);

export const startCase = {};

export const restfulReducer = (state, action = {}) => {
    switch (action.type) {
        case 'getItems':
            return { ...state, ...action, isEmpty: _.isEmpty(action.times) && action.items ? true : false };
        case 'postItem':
            return { ...state, ...action, items: [ action.item, ...state.items ] };
        case 'getItem':
            return { ...state, ...action, items: _.map(state.items, (item) => (item.id === action.id ? action.item : item)) };
        case 'putItem':
            return { ...state, ...action, items: _.map(state.items, (item) => (item.id === action.id ? action.item : item)) };
        case 'deleteItem':
            return { ...state, ...action, items: _.reject(state.items, (item) => item.id === action.id) };
        case 'getItemsLoad':
            return { ...state, ...action, items: [ ...state.items, action.items ] };
        case 'setItem':
            return { ...state, ...action, item: action.item, items: _.map(state.items, (item) => (item.id === action.item.id ? action.item : item)) };
        case 'setItems':
            return { ...state, ...action };
        case 'selectItem':
            return { ...state, ...action, item: _.find(state.items, (item) => item.id === action.id) || state.item };
        case 'init':
            return action.init;
        case 'start':
            return { ...state, ...action, condition: condition[action.type] };
        case 'fail':
            return { ...state, ...action, condition: condition[action.type] };
        default:
            return state;
    }
};

export const initBasicState = {
    name: null,
    condition: { isLoading: false, isSuccess: null, error: {} }
};
export const initRestfulState = {
    name: null,
    condition: { isLoading: false, isSuccess: null, error: {} },
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

export const initRespError = (error = {}) => {
    console.log(error);

    if (error.status === 502) {
        return { message: error.message + ' Server is down.', errorMessage: error.message + ' Server is down.', status: 502 };
    } else if (!error.response) {
        return { message: error.message + ' This error is provide by react app ', errorMessage: error.message + 'This error is provide by react app ', status: -1 };
    } else if (!error.response.data) {
        return { errorMessage: error.message + 'Sever does not provide response data, plz check with server', status: -1 };
    } else {
        return error.response.data;
    }
};

export const authHeaders = (headers, required) => {
    let _headers = { ...headers };
    if (required) {
        _headers = { ...headers, Authorization: 'Bearer ' + localStorage.getItem('accessToken') };
    } else {
        if (localStorage.getItem('accessToken')) {
            _headers = { ...headers, Authorization: 'Bearer ' + localStorage.getItem('accessToken') };
        } else if (localStorage.getItem('thirdToken')) {
            _headers = { ...headers, Authorization: 'Bearer ' + localStorage.getItem('thirdToken') };
        }
    }
    return _headers;
};
export const restfulURL = (url, id) => {
    let URL = url;
    URL = id ? URL + id : URL;
    return URL;
};

export const formDataUploadImagesRequest = async (propData, type, headers) => {
    let target = 'file';
    console.log(propData);

    const dataList = _.flattenDeep([ propData ]);
    const headData = _.head(dataList);
    if (headData.imageUrl) {
        target = 'image';
    } else if (headData.videoUrl) {
        target = 'video';
    }
    const formData = new FormData();
    dataList.map((data) => {
        formData.append(target + 's', data.file);
        formData.append('tagsList', data.tags);
        return formData;
    });

    // Display the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    const targetUrl = '/upload' + _.capitalize(target) + 's';

    const resp = await axios.post(process.env.REACT_APP_DATA_API + targetUrl, formData, { headers });
    if (!_.isArray(resp.data[`${target}s`])) {
        throw new Error('data is empty');
    } else if (type === 'string') {
        return _.map(resp.data[`${target}s`], (respData) => {
            return respData[`${target}Url`];
        });
    } else {
        return resp.data[`${target}s`];
    }
};

export const imageFilesDispatchAction = (dispatch, { type, name, url, method }, apiAxios, objectName = 'item') => async (config = {}) => {
    const { id, data = {}, params, headers: propHeaders, required, formDataUpload = {}, isLoading = true } = config;
    console.log('In!!');
    try {
        const URL = restfulURL(url, id);
        const headers = authHeaders(propHeaders, required);

        dispatch({ type: 'start', name, id, condition: { ...condition.start, isLoading, error: {} } });
        if (formDataUpload.data) {
            const respData = await formDataUploadImagesRequest(formDataUpload.data, formDataUpload.type, headers);
            if (objectName !== 'item') {
                if (_.isArray(formDataUpload.data)) {
                    data[objectName][formDataUpload.name] = respData;
                } else {
                    data[objectName][formDataUpload.name] = _.head(respData);
                }
            } else {
                if (_.isArray(formDataUpload.data)) {
                    data[formDataUpload.name] = respData;
                } else {
                    data[formDataUpload.name] = _.head(respData);
                }
            }

            console.log(data);
        } else {
            console.log(URL, data, method, headers, params);
        }

        const resp = await apiAxios({ url: URL, data, method, headers: { ...headers }, params });
        dispatch({ type, id, ...initRespData(resp.data, objectName), condition: condition.success });
    } catch (err) {
        dispatch({ type: 'fail', id, condition: { ...condition.fail, error: initRespError(err) } });
    }
};

export const initAction = (dispatch, init) => {
    dispatch({ type: 'init', name: 'init', init });
};
export const dispatchAction = (dispatch, { type, name, url, method }, apiAxios, objectName = 'item') => async (config = {}) => {
    const { id, data = {}, params, headers: propHeaders, required, isLoading = true } = config;
    try {
        const URL = restfulURL(url, id);
        const headers = authHeaders(propHeaders, required);
        dispatch({ type: 'start', name, id, condition: { ...condition.start, isLoading } });
        const resp = await apiAxios({ url: URL, data, method, headers, params });
        dispatch({ type, id, ...initRespData(resp.data, objectName), condition: condition.success });
    } catch (err) {
        dispatch({ type: 'fail', id, condition: { ...condition.fail, error: initRespError(err) } });
    }
};

export const Controller = (dispatch, feilds, apiAxios, objectName) => {
    const controller = {};
    feilds.map((field) => (controller[field.name] = field.isFormData ? imageFilesDispatchAction(dispatch, field, apiAxios, objectName) : dispatchAction(dispatch, field, apiAxios, objectName)));

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

export const Condition = (action) => {
    switch (action) {
        case 'start':
            return { isSuccess: null, isLoading: true };
        case 'fail':
            return { isSuccess: false, isLoading: false };
        default:
            return { isSuccess: true, isLoading: false };
    }
};

export const condition = {
    start: { isSuccess: null, isLoading: true, error: {} },
    fail: { isSuccess: true, isLoading: false, error: {} },
    success: { isSuccess: true, isLoading: false, error: {} }
};
