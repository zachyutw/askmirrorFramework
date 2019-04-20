import React, { useContext, useCallback } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import TplAsyncContext, { withTplAsync } from '../../../contexts/Tpl/TplAsyncContext';
import { clickAction } from '../../../contexts/redux/redux.hook';
import logo from './logo.svg';
import './AppPage.css';

const App = (props) => {
    const globalContext = useContext(GlobalContext);
    const { t, language, setLanguage, setTheme } = globalContext;
    const tplAsyncContext = useContext(TplAsyncContext);
    const { action, tpls } = tplAsyncContext;
    const handleOnToggleLang = () => {
        setLanguage(language === 'zh_TW' ? 'en' : 'zh_TW');
    };
    // const handleOnColorChange = useCallback(
    //     () => {
    //         setTheme({ dark: '#4286f4', light: '#d3d9e2' });
    //     },
    //     [ setTheme ]
    // );
    const handleOnClickAction = useCallback((e) => clickAction(e, action), [ action ]);
    console.log(tplAsyncContext);
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
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

export default React.memo(withTplAsync(App));
