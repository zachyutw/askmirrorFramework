import React, { createContext, useState } from 'react';
import axios from 'axios';
const AxiosContext = createContext({});

const AxiosProviderPre = (props) => {
    const [ state, setState ] = useState({
        askmirror: axios.create({ baseURL: 'https://dev.askmirror.local:5001/api' })
    });

    return <AxiosContext.Provider value={{ ...state, setState }}>{props.children}</AxiosContext.Provider>;
};
export const AxiosProvider = AxiosProviderPre;

export const withAxios = (Componet) => (props) => {
    return (
        <AxiosProviderPre>
            <Componet {...props} />
        </AxiosProviderPre>
    );
};

export default AxiosContext;
