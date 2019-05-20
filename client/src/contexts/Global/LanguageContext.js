import React, { createContext, useState, useEffect, useCallback } from 'react';
import i18next from 'i18next';
import enLocale from '../../static/locale/en.locale.json';
import zhTWLocale from '../../static/locale/zh_TW.locale.json';
const LanguageContext = createContext({});
const languageList = [ 'en', 'zh_TW' ];
export const config = {
    lng: 'zh_TW',
    debug: false,
    fallbackLng: languageList,
    resources: {
        en: enLocale,
        zh_TW: zhTWLocale
    }
};
export const LanguageProvider = (props) => {
    const [ state, setState ] = useState({ key: 'langaugeContext', language: 'zh_TW', languageList });
    const initT = useCallback((text) => text, []);
    const [ t, setT ] = useState(() => initT);
    useEffect(() => {
        i18next.init(config).then((t) => setT(() => t));
    }, []);
    const setLanguage = useCallback((language) => {
        i18next.changeLanguage(language).then((t) => setT(() => t));
        setState((state) => ({ ...state, language }));
    }, []);
    return <LanguageContext.Provider value={{ t, setLanguage, ...state }}>{props.children}</LanguageContext.Provider>;
};

export const withLanguage = (Componet) => (props) => {
    return (
        <LanguageProvider>
            <Componet {...props} />
        </LanguageProvider>
    );
};

export default LanguageContext;
