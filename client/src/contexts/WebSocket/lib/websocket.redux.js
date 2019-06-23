import faker from 'faker';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { delay } from '../../../lib';
const userId = sessionStorage.getItem('appId');
const user = {
    id: userId,
    displayName: faker.name.findName(),
    avatar: faker.image.avatar()
};
const token = jwt.sign(user, 'askmirror');
export const reducer = (state, action) => {
    switch (action.type) {
        case 'onopen':
            return { ...state, isConnected: true };
        case 'onmessage':
            return { ...state, data: action.data };
        case 'onclose':
            return { ...state, isConnected: false };
        case 'onerror':
            return { ...state, errorCount: state.errorCount + 1 };
        case 'status':
            return {
                ...state,
                ...action.data,
                poolUsers: _.map(action.data.pool, (pool) => jwt.decode(decodeURIComponent(pool)))
            };
        case 'message':
            return {
                ...state,
                data: action.data,
                coversationSet: state.coversationSet.add({ sendFrom: action.data.sendFrom, text: action.data.text })
            };
        default:
            return state;
    }
};
export const initState = {
    isConnected: false,
    data: {},
    pool: [],
    coversationSet: new Set(),
    newText: null,
    errorCount: 0
};

export function webSocketConnect (url, isOnline, dispatch){
    const webSocket = new WebSocket(url);
    webSocket.onopen = () => {
        dispatch({ type: 'onopen' });
        console.log('connected to ' + url);
    };
    webSocket.onmessage = (ev) => {
        try {
            const data = JSON.parse(ev.data);
            if (data.type === 'status') {
                dispatch({ type: 'status', data });
            } else if (data.type === 'message') {
                dispatch({ type: 'message', data });
            } else {
                dispatch({ type: 'onmessage', data });
            }
        } catch (err) {
            dispatch({ type: 'onmessage', data: ev.data });
        }
    };
    webSocket.onclose = () => {
        console.log('close connection ' + url);
        dispatch({ type: 'onclose' });
    };
    webSocket.onerror = (ev) => {
        dispatch({ type: 'onerror' });
        if (isOnline) {
            delay(300)
                .then(() => {
                    webSocketConnect(url, isOnline, dispatch);
                })
                .then((err) => console.log(err));
        }
    };
    return webSocket;
}

export const SocketMessage = ({ text, token, sendTo, user }) => {
    return JSON.stringify({
        type: 'message',
        sendTo,
        user,
        token,
        text,
        createAt: new Date(),
        id: faker.random.uuid()
    });
};
