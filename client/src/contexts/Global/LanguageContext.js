import React, { createContext, useState, useEffect } from 'react';
import i18next from 'i18next';
import enLocale from '../../static/locale/en.locale.json';
import zhTWLocale from '../../static/locale/zh_TW.locale.json';
const LanguageContext = createContext({});
export const config = {
    lng: 'zh_TW',
    debug: true,
    fallbackLng: [ 'en', 'zh_TW' ],
    resources: {
        en: enLocale,
        zh_TW: zhTWLocale
    }
};
export const LanguageProvider = (props) => {
    const [ state, setState ] = useState({ key: 'langaugeContext', language: 'zh_TW' });
    const initT = (text) => text;
    const [ t, setT ] = useState(() => initT);
    useEffect(() => {
        i18next.init(config).then((t) => setT(() => t));
    }, []);
    const setLanguage = (language) => {
        i18next.changeLanguage(language).then((t) => setT(() => t));
        setState((state) => ({ ...state, language }));
    };
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
