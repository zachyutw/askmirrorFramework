import React from 'react';
import ReactDOM from 'react-dom';
import { restfulReducer, initRestfulState, restfulFields, Controller, dispatchAction } from './redux.hook';
import App from '../../App';
import { render, fireEvent, getByTestId } from 'react-testing-library';
import axios from 'axios';
import _ from 'lodash';

const testAxios = axios.create({ baseURL: 'https://dev.askmirror.local:5001/api' });
describe('Auth Model Testing', () => {
    test('test node Controller', async () => {
        const dispatch = (action) => {
            console.log(action);
        };
        const data = await dispatchAction(dispatch, { type: 'getList', name: 'getList', url: 'https://dev.askmirror.local:5001/api/tpl', method: 'get' }, axios);
        console.log(data);
        // const { container } = render(<App />);
        // console.log(container);
    });
});
