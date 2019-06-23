import { useEffect, useState, useReducer } from 'react';
import _ from 'lodash';

const Condition = (action) => {
    switch (action.type) {
        case 'start':
            return { isSuccess: null, isLoading: true, error: {} };
        case 'fail':
            return { isSuccess: false, isLoading: false, error: action.error };
        default:
            return { isSuccess: true, isLoading: false };
    }
};

const reducer = (state, action) => {
    const condition = Condition(action);
    switch (action.type) {
        case 'start':
            return { ...state, condition };
        case 'fail':
            return { ...state, condition };
        case 'success':
            return { ...state, condition };
        default:
            return { ...state };
    }
};
const useLoadScript = (attributeObj = {}) => {
    const [ state, dispatch ] = useReducer(reducer, {});
    useEffect(() => {
        const script = document.createElement('script');
        const attributeKeys = _.keys(attributeObj);
        attributeKeys.map((attrKey) => {
            script.setAttribute(attrKey, attributeObj[attrKey]);
        });
        dispatch({ type: 'start' });
        script.onload = () => {
            dispatch({ type: 'success' });
        };
        script.onerror = (error) => {
            dispatch({ type: 'fail', error });
        };
    }, []);
    return [ state, err ];
};

export default useLoadScript;
