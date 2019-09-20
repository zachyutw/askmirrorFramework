import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import LanguageContext, { withLanguage } from './LanguageContext';
import ThemeContext, { withTheme } from './ThemeContext';
import { withRouter } from 'react-router-dom';
const GlobalContext = createContext({});

const Provider = withRouter((props) => {
    const [ state, setState ] = useState({});
    window.pushG = props.history.push;
    window.replaceG = props.history.replace;
    const languageContext = useContext(LanguageContext);
    const themeContext = useContext(ThemeContext);
    return <GlobalContext.Provider value={{ ...state, setState, ...languageContext, ...themeContext }}>{props.children}</GlobalContext.Provider>;
});

export const GlobalProvider = withTheme(withLanguage(Provider));

export const withGlobal = (Componet) => (props) => {
    return (
        <GlobalProvider>
            <Componet {...props} />
        </GlobalProvider>
    );
};

export default GlobalContext;
