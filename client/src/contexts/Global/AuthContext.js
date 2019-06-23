import React, { createContext, useMemo, useReducer, useEffect } from 'react';
import { Controller, initBasicState, localStoargeFeild } from '../../hooks/redux.hook';
import axios from 'axios';
import uesRestful from '../../hooks/useRestful';
const API = 'http://localhost:5001/api';
const ROUTE_NAME = '/auth';
export const authAxios = axios.create({ baseURL: API + ROUTE_NAME, headers: { 'Cache-Control': 'no-cache' } });

const AuthContext = createContext({});
const reducer = (state, action) => {
    switch (action.type) {
        case 'getAuth':
            console.log(action);
            return { ...state, ...action };
        default:
            return { ...state };
    }
};

const controllerFeild = {
    postSignIn: { name: 'postSignIn', type: 'getAuth', url: '/signIn', method: 'post' },
    postSignUp: { name: 'postSignUp', type: 'getAuth', url: '/signUp', method: 'post' }
};
const controllerFeilds = Object.values(controllerFeild);
export const localAuthFields = [ 'accessToken', 'refreshToken' ];
export const Provider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, { ...initBasicState, ...localStoargeFeild(localAuthFields) });
    const controller = useMemo(() => Controller(dispatch, controllerFeilds, authAxios), [ dispatch ]);

    return <AuthContext.Provider value={{ state, controller }}>{props.children}</AuthContext.Provider>;
};

export const withAuth = (Componet) => (props) => {
    return (
        <Provider>
            <Componet {...props} />
        </Provider>
    );
};

export default AuthContext;
