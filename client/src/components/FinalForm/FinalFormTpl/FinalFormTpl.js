import React, { useMemo, useCallback, useEffect, useContext } from 'react';
import _ from 'lodash';
import GlobalContext, { withGlobal } from '../../../contexts/Global/GlobalContext';
import InputField from '../../Input/InputField/InputField';
import { sleep } from '../../../lib/timeout.helper';
import { Form, Field } from 'react-final-form';
import { getMeta, formRegisterFields } from '../finalForm';
const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};
export const fieldObj = {
    title: { name: 'titlte', placeholder: 'Set Titlte', label: 'Set Titlte' },
    description: { name: 'description', placeholder: 'Description', label: 'Description' }
};

export const fields = _.values(fieldObj);

/**
 * 
 * @param {handleSubmit:function,form:any,} props 
 */
const TplForm = (props) => {
    const {
        handleSubmit,
        form,
        pristine,
        values,
        touched,
        initialValues,
        modified,
        dirtyFields,

        active,
        errors,
        visited
    } = props;
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    const metaObj = useMemo(
        () =>
            getMeta(
                fields,
                [
                    { name: 'error', value: errors },
                    { name: 'visited', value: visited },
                    { name: 'touched', value: touched },
                    { name: 'dirty', value: dirtyFields },
                    { name: 'modified', value: modified },
                    { name: 'initial', value: initialValues }
                ],
                { active }
            ),
        [ errors, visited, touched, dirtyFields, modified, initialValues, active ]
    );
    useEffect(() => {
        formRegisterFields(form, fields);
    }, []);

    const handleOnChange = useCallback((e, data) => {
        // e.preveDefault();
        form.change(data.name, data.value);
    }, []);
    const handleOnFocus = useCallback((e) => {
        form.focus(e.target.name);
    }, []);
    const handleOnBlur = useCallback((e) => {
        form.blur(e.target.name);
    }, []);
    const handleOnReset = useCallback((e) => {
        form.reset();
    }, []);
    console.log(values);
    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <InputField
                    key={index}
                    {...field}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    meta={metaObj[field.name]}
                    uncontrol
                    value={values[field.name]}
                />
            ))}
            <Field component={InputField} {...fieldObj['title']} fieldType='final' />
            <button type='submit' disabled={pristine}>
                {t('submit')}
            </button>
            <button type='button' onClick={handleOnReset} disabled={pristine}>
                {t('reset')}
            </button>
        </form>
    );
};

const TplFinalFormPre = (props) => {
    const { initialValues = {} } = props;
    return <Form onSubmit={onSubmit} initialValues={initialValues} render={(props) => <TplForm {...props} />} />;
};
const TplFinalForm = withGlobal(TplFinalFormPre);
export default TplFinalForm;
