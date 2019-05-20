import React, { useCallback, useContext } from 'react';
import _ from 'lodash';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import InputField from '../../Input/InputField/InputField';
import { sleep } from '../../../lib/timeout.helper';
import { Form, Field } from 'react-final-form';
import InputItemP from '../../Input/InputItemP/InputItemP';
import Button from '@material-ui/core/Button';
import faker from 'faker';

const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};
export const fieldObj = {
    title: {
        name: 'titlte',
        placeholder: 'Set Titlte',
        label: 'Set Titlte',
        fieldType: 'search',
        type: 'search',
        required: true
    },
    description: {
        name: 'description',
        placeholder: 'Description',
        label: 'Description',
        fieldType: 'textarea',
        type: 'textarea'
    },
    fullName: {
        name: 'fullName',
        placeholder: 'Full Name',
        label: 'fullName',
        fieldType: 'inputM',
        type: 'text'
    },
    testItem: {
        name: 'testItem',
        fieldType: 'inputItemP',
        text: '123',
        value: '123'
    }
    // InputItemListP: {
    //     name: 'InputItemListP',
    //     fieldType: 'InputItemListP',
    //     options: [
    //         { key: 1, text: 'AAAA', value: 'aaaa' },
    //         { key: 1, text: 'BBBB', value: 'bbbb' },
    //         { key: 1, text: 'CCCC', value: 'cccc' }
    //     ]
    // }
};
const Card = (props) => {
    console.log(props);
    return <h1>{props.text}</h1>;
};

const testOptions = [
    { key: 1, text: 'AAAA', value: 'aaaa' },
    { key: 1, text: 'BBBB', value: 'bbbb' },
    { key: 1, text: 'CCCC', value: 'cccc' }
];

const itemOptions = _.map(testOptions, (option) => ({ ...option, item: <Card {...option} /> }));
const InputItemListP = {
    name: 'InputItemListP',
    // fieldType: 'InputItemListP',
    options: testOptions
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
    // }, [form]);
    const handleOnChange = (e, data) => {
        form.change(data.name, data.value);
    };
    const handleOnReset = useCallback(
        (e) => {
            form.reset();
        },
        [ form ]
    );
    console.log(values);
    return (
        <form onSubmit={handleSubmit}>
            <input type='time' />
            <input type='search' />
            {/* {fields.map((field, index) => <Field key={index} {...field} component={InputField} />)}

            <InputItemP.List {...InputItemListP} onChange={handleOnChange}>
                {(option) => <h1>{option.text}</h1>}
            </InputItemP.List>

            <InputItemP.List {...InputItemListP} onChange={handleOnChange} /> */}

            <Button variant='contained' color='primary' type='submit' disabled={pristine}>
                {t('Submit')}
            </Button>

            <button type='button' onClick={handleOnReset} disabled={pristine}>
                {t('Reset')}
            </button>
        </form>
    );
};

const TplFinalFormPre = (props) => {
    const { initialValues = {} } = props;
    return <Form onSubmit={onSubmit} initialValues={initialValues} render={(props) => <TplForm {...props} />} />;
};
const TplFinalForm = TplFinalFormPre;
export default TplFinalForm;
