import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import LanguageContext, { withLanguage } from './LanguageContext';
import ThemeContext, { withTheme } from './ThemeContext';
const GlobalContext = createContext({});

const Provider = (props) => {
    const [ state, setState ] = useState({});
    const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
    const languageContext = useContext(LanguageContext);
    const themeContext = useContext(ThemeContext);
    const [ isOnline, setIsOnline ] = useState(true);
    const onResize = useCallback(
        () => {
            setInnerWidth(window.innerWidth);
        },
        [ setInnerWidth ]
    );
    const onOnline = useCallback(
        () => {
            setIsOnline(true);
        },
        [ setIsOnline ]
    );
    const onOffline = useCallback(
        () => {
            setIsOnline(false);
        },
        [ setIsOnline ]
    );
    useEffect(() => {
        window.addEventListener('resize', onResize);
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, []);

    return <GlobalContext.Provider value={{ ...state, setState, innerWidth, isOnline, ...languageContext, ...themeContext }}>{props.children}</GlobalContext.Provider>;
};

export const GlobalProvider = withTheme(withLanguage(Provider));

export const withGlobal = (Componet) => (props) => {
    return (
        <GlobalProvider>
            <Componet {...props} />
        </GlobalProvider>
    );
};

export default GlobalContext;
