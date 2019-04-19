import React, { createContext, useState } from 'react';
const TplContext = createContext({});

const TplProviderPre = (props) => {
    const [ state, setState ] = useState({});
    return <TplContext.Provider value={{ ...state, setState }}>{props.children}</TplContext.Provider>;
};
export const TplProvider = TplProviderPre;

export const withTpl = (Componet) => (props) => {
    return (
        <TplProviderPre>
            <Componet {...props} />
        </TplProviderPre>
    );
};

export default TplContext;
