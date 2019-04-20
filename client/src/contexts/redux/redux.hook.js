import axios from 'axios';
import _ from 'lodash';
import faker from 'faker';
export const getList = (dispatch, { objectName, routeName, url }, customAxios) => (params, headers) => {
    const actionName = 'getList';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .get(url ? url : '/' + routeName + '/', { params, headers })
        .then((res) => {
            console.log(res);
            dispatch({ type: actionName, list: res.data[objectName + 's'] });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};

export const getItem = (dispatch, { objectName, routeName, url }, customAxios) => (id, params, headers) => {
    const actionName = 'getItem';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .get(url ? url : '/' + routeName + '/' + id, { params, headers })
        .then((res) => {
            dispatch({ type: actionName, item: res.data[objectName], id });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};
export const postItem = (dispatch, { objectName, routeName, url }, customAxios) => (data, params, headers) => {
    const actionName = 'postItem';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .post(url ? url : '/' + routeName + '/', data, { params, headers })
        .then((res) => {
            dispatch({ type: actionName, item: res.data[objectName] });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};
export const putItem = (dispatch, { objectName, routeName, url }, customAxios) => (id, data, params, headers) => {
    const actionName = 'putItem';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .put(url ? url : '/' + routeName + '/' + id, data, { params, headers })
        .then((res) => {
            dispatch({ type: actionName, item: res.data[objectName], id });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};
export const deleteItem = (dispatch, { objectName, routeName, url }, customAxios) => (id, params, headers) => {
    const actionName = 'deleteItem';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .delete(url ? url : '/' + routeName + '/' + id, { params, headers })
        .then((res) => {
            dispatch({ type: actionName, item: {}, id });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};
export const getSchema = (dispatch, { objectName, routeName, url }, customAxios) => (params, headers) => {
    const actionName = 'getSchema';
    const instanceAxios = customAxios || axios;
    dispatch({ type: 'start' });
    instanceAxios
        .get(url ? url : '/' + routeName + '/schema', { params, headers })
        .then((res) => {
            dispatch({ type: 'setValue', value: res.data.schema, name: 'schema', actionName });
        })
        .catch((err) => {
            dispatch({ type: 'fail', errorMessage: err.message });
        });
};

export const getRESTFulAction = (
    { listDispatch, itemDispatch },
    { objectName, routeName, urlObj = {} },
    customAxios
) => {
    const action = {};
    action.getList = getList(listDispatch, { objectName, routeName, url: urlObj['getList'] }, customAxios);
    action.postItem = postItem(itemDispatch, { objectName, routeName, url: urlObj['postItem'] }, customAxios);
    action.getItem = getItem(itemDispatch, { objectName, routeName, url: urlObj['getItem'] }, customAxios);
    action.putItem = putItem(itemDispatch, { objectName, routeName, url: urlObj['putItem'] }, customAxios);
    action.deleteItem = deleteItem(itemDispatch, { objectName, routeName, url: urlObj['deleteItem'] }, customAxios);
    action.getSchema = getSchema(itemDispatch, { objectName, routeName, url: urlObj['getSchema'] }, customAxios);

    return action;
};
export const initListState = {
    isLoading: false,
    success: null,
    errorMessage: null,
    list: []
};
export const initItemState = {
    isLoading: false,
    success: null,
    errorMessage: null,
    item: {}
};

export const itemReducer = (state, action) => {
    switch (action.type) {
        case 'setItem':
            return {
                ...state,
                isLoading: false,
                id: action.id,
                item: action.item || {},
                success: action.type
            };
        case 'setValue':
            const keyName = action.name || 'data';
            return {
                ...state,
                isLoading: false,
                [keyName]: action.value || null,
                success: action.type + keyName
            };
        case 'postItem':
            const postItem = action.item || {};
            return {
                ...state,
                isLoading: false,
                id: postItem.id,
                item: postItem,
                success: action.type
            };
        case 'getItem':
            return {
                ...state,
                isLoading: false,
                id: action.id,
                item: action.item || {},
                success: action.type
            };
        case 'putItem':
            return {
                ...state,
                isLoading: false,
                id: action.id,
                item: action.item || {},
                success: action.type
            };
        case 'deleteItem':
            return {
                ...state,
                isLoading: false,
                id: action.id,
                item: {},
                success: action.type
            };

        case 'start':
            return {
                ...state,
                isLoading: true,
                success: null,
                errorMessage: null
            };
        case 'fail':
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};
export const listReducer = (state, action) => {
    switch (action.type) {
        case 'setList':
            return {
                ...state,
                isLoading: false,
                list: action.list || [],
                success: action.type
            };
        case 'getList':
            return {
                ...state,
                isLoading: false,
                list: action.list || [],
                success: action.type
            };
        case 'postItem':
            return {
                ...state,
                list: [ action.item, ...state.list ]
            };
        case 'getItem':
            return {
                ...state,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item))
            };
        case 'putItem':
            return {
                ...state,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item))
            };
        case 'setItem':
            return {
                ...state,
                list: _.map(state.list, (item) => (item.id === action.id ? action.item : item))
            };
        case 'deleteItem':
            return {
                ...state,
                list: _.reject(state.list, (item) => item.id === action.id)
            };
        case 'setValue':
            const keyName = action.name || 'data';
            return {
                ...state,
                isLoading: false,
                [keyName]: action.value || null,
                success: action.type + keyName
            };
        case 'start':
            return {
                ...state,
                isLoading: true,
                success: null,
                errorMessage: null
            };
        case 'fail':
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};

export const clickAction = (e, action) => {
    e.preventDefault();
    switch (e.target.name) {
        case 'getSchema':
            action.getSchema();
            break;
        case 'getList':
            action.getList();
            break;
        case 'postItem':
            action.postItem({
                title: faker.commerce.productName(),
                tags: [ 'tag1', 'tag2' ],
                description: faker.lorem.paragraph(10)
            });
            break;
        case 'getItem':
            action.getItem(e.target.getAttribute('data-id'));
            break;
        case 'deleteItem':
            action.deleteItem(e.target.getAttribute('data-id'));
            break;
        case 'putItem':
            action.putItem(e.target.getAttribute('data-id'), { title: faker.commerce.productName() });
            break;
        default:
            console.log('Not Set');
            break;
    }
};

export const sideEffectItemStateToListState = (itemState, listDispatch) => {
    if (itemState.success) {
        listDispatch({
            type: itemState.success,
            item: itemState.item,
            id: itemState.id
        });
    }
};
