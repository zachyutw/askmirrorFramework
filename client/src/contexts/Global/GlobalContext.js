import React, { createContext, useState, useContext, useEffect } from 'react';
import LanguageContext, { withLanguage } from './LanguageContext';
import ThemeContext, { withTheme } from './ThemeContext';
const GlobalContext = createContext({});

const GlobalProviderPre = (props) => {
    const [ state, setState ] = useState({});
    const [ regitoration, setRegistoration ] = useState({ networking: true });
    const languageContext = useContext(LanguageContext);
    const themeContext = useContext(ThemeContext);
    const [ isOnline, setIsOnline ] = useState(true);
    const { onLine } = navigator;
    useEffect(() => {
        window.addEventListener('online', () => {
            setIsOnline(true);
        });
        window.addEventListener('offline', () => {
            setIsOnline(false);
        });
        return () => {
            window.removeEventListener('online');
            window.removeEventListener('offline');
        };
    }, []);

    return (
        <GlobalContext.Provider value={{ ...state, setState, isOnline, ...languageContext, ...themeContext }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export const GlobalProvider = withTheme(withLanguage(GlobalProviderPre));

export const withGlobal = (Componet) => (props) => {
    return (
        <GlobalProvider>
            <Componet {...props} />
        </GlobalProvider>
    );
};

export default GlobalContext;
