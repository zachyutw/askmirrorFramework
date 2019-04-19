import React, { useContext } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import TplAsyncContext, { withTplAsync } from '../../../contexts/Tpl/TplAsyncContext';
import logo from './logo.svg';
import './AppPage.css';

const App = (props) => {
    const globalContext = useContext(GlobalContext);
    const { t, language, setLanguage, setTheme } = globalContext;
    // const tplAsyncContext = useContext(TplAsyncContext);
    const handleOnToggleLang = () => {
        setLanguage(language === 'zh_TW' ? 'en' : 'zh_TW');
    };
    const handleOnColorChange = () => {
        setTheme({ dark: '#4286f4', light: '#d3d9e2' });
    };
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <button onClick={handleOnColorChange}>change color</button>
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
