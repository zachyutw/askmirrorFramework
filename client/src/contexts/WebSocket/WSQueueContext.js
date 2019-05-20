import React, { useState, useReducer, useEffect, useCallback, useContext, createContext } from 'react';
import GlobalContext from '../Global/GlobalContext';
import jwt from 'jsonwebtoken';
import { reducer, initState, webSocketConnect, SocketMessage, SocketSubcribe } from './lib/websocket.redux';
import faker from 'faker';
const userId = sessionStorage.getItem('appId');
const user = {
    id: userId,
    displayName: faker.name.findName(),
    avatar: faker.image.avatar()
};
const WSQueueContext = createContext({});

const token = jwt.sign(user, 'askmirror');
const CONNECT_URL = 'ws://localhost:5000/ws/queue/';

export const WSQueueProvider = (props) => {
    const globalContext = useContext(GlobalContext);
    // const [ data, setData ] = useState({});
    // const [ isConnected, setIsConnected ] = useState(false);
    const [ isActived, setIsActived ] = useState(true);
    const [ wsState, wsDispatch ] = useReducer(reducer, initState);
    const { isConnected } = wsState;
    const [ ws, setWs ] = useState(null);
    const { isOnline } = globalContext;

    useEffect(
        () => {
            if (isOnline) {
                if (isActived) {
                    const wsSocket = webSocketConnect(CONNECT_URL, token, isOnline, wsDispatch);
                    setWs(wsSocket);
                }
            }
        },
        [ isActived, isOnline ]
    );
    const subcrite = useCallback(
        (url) => {
            if (isConnected) {
                const socketSubcribe = SocketSubcribe({ url });
                ws.send(socketSubcribe);
            }
        },
        [ isConnected ]
    );
    const sendText = useCallback(
        (text, sendTo) => {
            console.log(text, sendTo);
            if (isConnected) {
                const socketMessage = SocketMessage({ text, sendTo });
                ws.send(socketMessage);
            }
        },
        [ ws, isConnected ]
    );

    return (
        <WSQueueContext.Provider value={{ ...wsState, setIsActived, sendText, subcrite }}>
            {props.children}
        </WSQueueContext.Provider>
    );
};

export const withWSQueue = (Component) => (props) => {
    return (
        <WSQueueProvider>
            <Component {...props} />
        </WSQueueProvider>
    );
};

export default WSQueueContext;
