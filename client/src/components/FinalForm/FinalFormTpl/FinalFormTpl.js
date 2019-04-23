import React, { useCallback, useContext } from 'react';
import _ from 'lodash';
import GlobalContext, { withGlobal } from '../../../contexts/Global/GlobalContext';
import InputField from '../../Input/InputField/InputField';
import { sleep } from '../../../lib/timeout.helper';
import { Form, Field } from 'react-final-form';
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
    const { handleSubmit, form, pristine, values } = props;
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;

    // const handleOnChange = useCallback((e, data) => {
    //     // e.preveDefault();
    //     form.change(data.name, data.value);
    // }, []);

    const handleOnReset = useCallback((e) => {
        form.reset();
    }, []);
    console.log(values);
    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => <Field key={index} {...field} component={InputField} />)}
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
