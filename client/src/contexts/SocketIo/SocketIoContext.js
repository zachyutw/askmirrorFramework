import React, { useState, useReducer, useEffect, useCallback, useContext, createContext } from 'react';
import GlobalContext from '../Global/GlobalContext';

const token = sessionStorage.getItem('appId');
const CONNECT_URL = 'ws://localhost:5000/ws/queue/' + token;

const SocketIoContext = createContext({});

export const SocketIoProvider = (props) => {
    const globalContext = useContext(GlobalContext);

    return <SocketIoContext.Provider value={{}}>{props.children}</SocketIoContext.Provider>;
};

export const withWSQueue = (Component) => (props) => {
    return (
        <SocketIoProvider>
            <Component {...props} />
        </SocketIoProvider>
    );
};

export default SocketIoContext;
