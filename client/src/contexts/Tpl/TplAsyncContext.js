import React, { createContext } from 'react';
import useRestful from '../../hooks/useRestful';
import axios from 'axios';
const routeName = '/tpl';
const objectName = 'tpl';
const restfulAxios = axios.create({ baseURL: 'https://dev.askmirror.local:5001/api' + routeName });
const TplAsyncContext = createContext({});
const Provider = (props) => {
    const [ state, controller ] = useRestful(restfulAxios, objectName);
    return <TplAsyncContext.Provider value={{ controller, state }}>{props.children}</TplAsyncContext.Provider>;
};
export const withTplAsync = (Componet) => (props) => {
    return (
        <Provider>
            <Componet {...props} />
        </Provider>
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
