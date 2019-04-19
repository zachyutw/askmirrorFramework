import React, { createContext, useState, useContext } from 'react';
import AxiosContext, { withAxios } from '../Axios/AxiosContext';
const TplAsyncContext = createContext({});
const getList = (axiosCust, routeName, { start, success, fail }) => {};
const getAction = (axiosCust, routeName, statusAction) => {
    const action = {};
};

const TplAsyncProviderPre = (props) => {
    const ROUTE_NAME = 'tpl';
    const OBJECT_NAME = 'tyl';
    const [ state, setState ] = useState({});
    const [ meta, setMeta ] = useState({});
    const [ list, setList ] = useState([]);
    const [ item, setItem ] = useState({});
    const axiosContext = useContext(AxiosContext);

    const start = (type) => {
        setMeta((meta) => ({ ...meta, isLoading: true, isSuccess: null, type }));
    };
    const success = (type, data) => {
        if (data[OBJECT_NAME + 's']) {
            setList(data[OBJECT_NAME + 's']);
        } else if (data[OBJECT_NAME]) {
            setItem(data[OBJECT_NAME]);
        } else {
        }
        setMeta((meta) => ({ ...meta, isLoading: false, isSuccess: true, type }));
    };
    const fail = (type, error) => {
        setMeta((meta) => ({ ...meta, isLoading: false, isSuccess: false, type }));
    };
    const action = getAction(axiosContext, ROUTE_NAME, { start, success, fail });
    return <TplAsyncContext.Provider value={{ ...state, setState }}>{props.children}</TplAsyncContext.Provider>;
};
export const TplAsyncProvider = withAxios(TplAsyncProviderPre);

export const withTplAsync = (Componet) => (props) => {
    return (
        <TplAsyncProvider>
            <Componet {...props} />
        </TplAsyncProvider>
    );
};

export default TplAsyncContext;
