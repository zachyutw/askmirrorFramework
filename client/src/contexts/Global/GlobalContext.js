import React, { createContext, useState, useContext } from 'react';
import LanguageContext, { withLanguage } from './LanguageContext';
import ThemeContext, { withTheme } from './ThemeContext';
const GlobalContext = createContext({});

const GlobalProviderPre = (props) => {
    const [ state, setState ] = useState({ abe: 2 });
    const languageContext = useContext(LanguageContext);
    const themeContext = useContext(ThemeContext);
    return (
        <GlobalContext.Provider value={{ ...state, setState, ...languageContext, ...themeContext }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export const GlobalProvider = withTheme(withLanguage(GlobalProviderPre));

export const withGlobal = (Componet) => (props) => {
    return (
        <GlobalProviderPre>
            <Componet {...props} />
        </GlobalProviderPre>
    );
};

export default GlobalContext;
