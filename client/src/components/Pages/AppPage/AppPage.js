import React, { useContext, useCallback, useState, useRef, useEffect, useMemo } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import TplAsyncContext, { withTplAsync } from '../../../contexts/Tpl/TplAsyncContext';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';
import { DragDropContext } from 'react-beautiful-dnd';
import { Ref, Embed } from 'semantic-ui-react';
import ButtonP from '../../App/ButtonP/ButtonP';
// import FinalFormTpl from '../../FinalForm/FinalFormTpl/FinalFormTpl';
import s from './AppPage.module.css';
import InputField from '../../Input/InputField/InputField';
import snapVideo from '../../../lib/snapVideo';
import ChatWS from '../../Chat/ChatWS/ChatWS';
import logo from './logo.svg';
// import Camera from '../../Camera/Camera';
// import io from 'socket.io-client';
import './AppPage.css';
import CameraUserMedia from '../../Camera/CameraUserMedia/CameraUserMedia';
// const socket = io('http://localhost:5000');

const App = (props) => {
    const globalContext = useContext(GlobalContext);
    const { t, language, setLanguage, setTheme } = globalContext;
    const tplAsyncContext = useContext(TplAsyncContext);
    const { controller = {} } = tplAsyncContext;
    const fixRef = useRef(null);
    const handleOnToggleLang = () => {
        setLanguage(language === 'zh_TW' ? 'en' : 'zh_TW');
    };
    const handleOnColorChange = useCallback(
        () => {
            setTheme({ dark: '#4286f4', light: '#d3d9e2' });
        },
        [ setTheme ]
    );
    const handleOnClick = useCallback(
        (e, { name, value }) => {
            if (controller[name]) {
                controller[name](value);
            }
        },
        [ controller ]
    );
    console.log(tplAsyncContext);
    return (
        <Layout>
            <PageP>
                {/* <CameraUserMedia /> */}
                <SectionP toggle>
                    <div className='ui container'>
                        <header className='App-header'>
                            <div ref={fixRef} style={{ position: 'fixed', right: '1em', bottom: '2em' }}>
                                {/* <ChatWS /> */}
                            </div>
                            <ButtonP onClick={handleOnClick} className='content' name='getItem' value={{ id: '5cbacca5ab3cbb954f6555ce' }}>
                                Click
                            </ButtonP>
                            <button onClick={handleOnColorChange}>Theme</button>
                            <img src={logo} className='App-logo' alt='logo' />
                            <p>
                                {t('Edit')} <code onClick={handleOnToggleLang}>src/App.js</code> and save to reload.
                            </p>
                            <h1 className='themeColor'> Test 123 </h1>
                            <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                                Learn React
                            </a>
                        </header>
                    </div>
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default withTplAsync(App);
