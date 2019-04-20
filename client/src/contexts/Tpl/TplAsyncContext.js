import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import Joi from 'joi';
import { apiAxios } from '../../axios/api.axios';
import {
    getRESTFulAction,
    initItemState,
    initListState,
    itemReducer,
    listReducer,
    sideEffectItemStateToListState
} from '../redux/redux.hook';
const TplAsyncContext = createContext({});

const TplSchema = Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    createdAt: Joi.date(),
    description: Joi.string(),
    id: Joi.string(),
    image: Joi.object().keys({
        photoUrl: Joi.string(),
        thumbUrl: Joi.string(),
        tags: Joi.array().items(Joi.string().optional())
    }),
    title: Joi.string(),
    updatedAt: Joi.date()
});
const TplAsyncProviderPre = (props) => {
    const ROUTE_NAME = 'tpl';
    const OBJECT_NAME = 'tpl';

    const [ itemState, itemDispatch ] = useReducer(itemReducer, initItemState);
    const [ listState, listDispatch ] = useReducer(listReducer, initListState);
    /** list side effect */

    useEffect(
        () => {
            sideEffectItemStateToListState(itemState, listDispatch);
        },
        [ itemState ]
    );

    const action = useMemo(() => {
        const action = getRESTFulAction(
            { listDispatch, itemDispatch },
            { objectName: OBJECT_NAME, routeName: ROUTE_NAME },
            apiAxios
        );
        return action;
    }, []);
    return (
        <TplAsyncContext.Provider
            value={{
                [OBJECT_NAME]: itemState.item,
                [OBJECT_NAME + 's']: listState.list,
                action,
                TplSchema,
                itemState,
                listState
            }}
        >
            {props.children}
        </TplAsyncContext.Provider>
    );
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
