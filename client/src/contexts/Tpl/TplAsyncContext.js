import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import useRestful from '../../hooks/useRestful';
const ROUTE_NAME = 'tpl';
const TplAsyncContext = createContext({});
const TplAsyncProviderPre = (props) => {
    const [ state, controller ] = useRestful('https://dev.askmirror.local:5001/api', ROUTE_NAME);
    return <TplAsyncContext.Provider value={{ controller, state }}>{props.children}</TplAsyncContext.Provider>;
};
export const TplAsyncProvider = TplAsyncProviderPre;

export const withTplAsync = (Componet) => (props) => {
    return (
        <TplAsyncProvider>
            <Componet {...props} />
        </TplAsyncProvider>
    );
};

export default TplAsyncContext;
// const TplSchema = Joi.object().keys({
//     name: Joi.string(),
//     category: Joi.string(),
//     createdAt: Joi.date(),
//     description: Joi.string(),
//     id: Joi.string(),
//     image: Joi.object().keys({
//         photoUrl: Joi.string(),
//         thumbUrl: Joi.string(),
//         tags: Joi.array().items(Joi.string().optional())
//     }),
//     title: Joi.string(),
//     updatedAt: Joi.date()
// });
