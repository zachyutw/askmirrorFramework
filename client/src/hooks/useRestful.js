import React, { useReducer, useMemo } from 'react';
import axios from 'axios';
import { Controller, restfulFields, initRestfulState, restfulReducer } from './redux.hook';

const useRestful = (baseURL, ROUTE_NAME) => {
    const [ state, dispatch ] = useReducer(restfulReducer, initRestfulState);
    const apiAxios = useMemo(
        () => {
            return axios.create({ baseURL });
        },
        [ baseURL ]
    );
    const controller = useMemo(
        () => {
            const controller = Controller(dispatch, restfulFields, apiAxios, ROUTE_NAME);
            return controller;
        },
        [ dispatch, apiAxios ]
    );
    return [ state, controller ];
};

export default useRestful;
