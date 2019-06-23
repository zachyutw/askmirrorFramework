import React, { useCallback, useContext, useState, useMemo } from 'react';
import _ from 'lodash';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import AuthContext from '../../../contexts/Global/AuthContext';
import InputField from '../../Input/InputField/InputField';
import s from './AuthFinalForm.module.css';
import { Form as FormS } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form';

const authRoute = { signIn: { name: 'signIn', to: '/auth/signIn' }, signUp: { name: 'signUp', to: '/auth/signUp' } };
const { signIn, signUp } = authRoute;
const categoryOptions = [ { key: '1', text: '+1', value: '1', flag: 'ca' }, { key: '2', text: '+1', value: '1', flag: 'us' }, { key: '3', text: '+86', value: '86', flag: 'cn' } ];
export const fieldObj = {
    email: {
        name: 'email',
        placeholder: 'Account Email',
        fieldType: 'inputS',
        required: true,
        hint: 'Email should follow',
        pattern: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    },
    countryCode: { name: 'countryCode', options: categoryOptions, defaultValue: '1', fieldType: 'selectionS' },
    phoneNumber: {
        name: 'phoneNumber',
        required: true,
        fieldType: 'inputS',
        type: 'number',
        placeholder: 'Set Phone Number',
        pattern: new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    },
    verificationCode: {
        name: 'verificationCode',
        type: 'text',
        required: true,
        fieldType: 'inputS',
        placeholder: '输入验证码'
    },
    password: {
        name: 'password',
        required: true,
        placeholder: 'Enter Password',
        fieldType: 'inputS',
        type: 'password'
    },
    repassword: {
        name: 'repassword',
        required: true,
        placeholder: 'Repeat Password',
        fieldType: 'inputS',
        type: 'password'
    }
};
export const fieldKeys = _.keys(fieldObj);
const initFieldState = fieldKeys.reduce((prev, cur) => {
    prev[cur] = false;
    return prev;
}, {});

export const fields = _.values(fieldObj);
export const categoryOptionsConverse = categoryOptions.reduce((prev, cur) => {
    prev[cur] = cur.text;
    return prev;
}, {});

const fieldReducer = (state, action) => {
    switch (action.type) {
        case signUp.name:
            return {
                ...state,
                password: true,
                repassword: true,
                email: true
            };
        case signIn.name:
            return {
                ...state,
                email: true,
                password: true,
                remeberme: false
            };
        default:
            return state;
    }
};
/**
 *
 * @param {handleSubmit:function,form:any,} props
 */
const AuthForm = (props) => {
    const { onSubmit, form, values } = props;
    const globalContext = useContext(GlobalContext);
    const { t = (text) => text } = globalContext;
    const handleOnSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log(values);
            form.reset();
            onSubmit(e, { name: 'form', value: values });
        },
        [ values, onSubmit ]
    );
    return (
        <FormS className={[ s.form, 'general', 'theme' ].join(' ')} onSubmit={onSubmit}>
            <Field className={s.field} {...fieldObj['email']} component={InputField} />
            <Field className={s.field} {...fieldObj['password']} component={InputField} />
            <Field className={s.field} {...fieldObj['repassword']} component={InputField} />
            <div className={[ s.btns ].join(' ')}>
                <button onClick={handleOnSubmit} className='ui button' type='submit'>
                    {t('Submit')}
                </button>
            </div>
        </FormS>
    );
};

const validate = (fields = [], name) => (values) => {
    const errors = {};

    fields.map((field) => {
        if (field.required && !values[field.name]) {
            errors[field.name] = 'Required';
        }

        if (!values[field.name]) {
        } else if (values['password'] !== values['repassword']) {
            errors['repassword'] = 'Password Not match';
        } else if (field.pattern && !field.pattern.test(values[field.name])) {
            errors[field.name] = 'No Valid Pattern';
        } else if (field.maxLength && values[field.name].length > field.maxLength) {
            errors[field.name] = 'Exceed maximum number of characters';
        } else if (field.minLength && values[field.name].length < field.minLength) {
            errors[field.name] = 'Exceed miniimum number of characters';
        }
        return field;
    });
    return errors;
};

const AuthFormFinalForm = (props) => {
    const { initialValues = {}, name } = props;
    const authContext = useContext(AuthContext);
    console.log(authContext);
    return <Form validate={validate(fields, name)} onSubmit={props.onSubmit} initialValues={initialValues} render={(finalProps) => <AuthForm {...props} {...finalProps} />} />;
};

export default AuthFormFinalForm;
