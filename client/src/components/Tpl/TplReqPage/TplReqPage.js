import React, { useContext, useCallback } from 'react';
// import _ from 'lodash';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import WebSocketContext from '../../../contexts/WebSocket/WebSocketContext';
import TplAsyncContext, { withTplAsync } from '../../../contexts/Tpl/TplAsyncContext';
import FinalFormTpl from '../../FinalForm/FinalFormTpl/FinalFormTpl';
import InputItemP from '../../Input/InputItemP/InputItemP';
import { clickAction } from '../../../contexts/redux/redux.hook';
import logo from './logo.svg';
// import io from 'socket.io-client';
import './AppPage.css';
// const socket = io('http://localhost:5000');

const ws = new WebSocket('ws://localhost:5000/wsa');
ws.onopen = (ev) => {
    console.log('connect wsa server');
    ws.send("Here's some text that the server is urgently awaiting!");
};
ws.onmessage = (ev) => {
    console.log('Received Message: ' + ev.data);
    // ws.close();
};
ws.onclose = function (evt){
    console.log('Connection closed.');
};
const App = (props) => {
    const globalContext = useContext(GlobalContext);
    const { t, language, setLanguage, setTheme } = globalContext;
    const webSocketContext = useContext(WebSocketContext);
    const tplAsyncContext = useContext(TplAsyncContext);
    const { action, tpls } = tplAsyncContext;
    const handleOnToggleLang = () => {
        setLanguage(language === 'zh_TW' ? 'en' : 'zh_TW');
    };
    const handleOnColorChange = useCallback(
        () => {
            setTheme({ dark: '#4286f4', light: '#d3d9e2' });
        },
        [ setTheme ]
    );
    console.log(webSocketContext);
    const handleOnClickAction = useCallback((e) => clickAction(e, action), [ action ]);

    return (
        <div className='App'>
            <header className='App-header'>
                <button
                    onClick={() => {
                        ws.send("Here's some text that the server is urgently awaiting!");
                    }}
                >
                    Testt
                </button>
                <InputItemP onChange={(e, data) => console.log(data)} text='test' icon='add' />
                <button onClick={handleOnColorChange}>Theme</button>
                <img src={logo} className='App-logo' alt='logo' />
                <FinalFormTpl />

                <button onClick={handleOnClickAction} name='getSchema'>
                    Get Schema
                </button>
                <button onClick={handleOnClickAction} name='postItem'>
                    Create{' '}
                </button>
                <button onClick={handleOnClickAction} name='getList'>
                    List {' '}
                </button>

                <ul>
                    {tpls.map((item, index) => (
                        <li key={index} name={item.id}>
                            {item.title}
                            <button onClick={handleOnClickAction} name='deleteItem' data-id={item.id}>
                                Delete {' '}
                            </button>
                            <button onClick={handleOnClickAction} name='putItem' data-id={item.id}>
                                Edit {' '}
                            </button>
                            <button onClick={handleOnClickAction} name='getItem' data-id={item.id}>
                                Detail {' '}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    {t('Edit')} <code onClick={handleOnToggleLang}>src/App.js</code> and save to reload.
                </p>
                <h1 className='themeColor'> Test 123 </h1>
                <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default withTplAsync(App);
