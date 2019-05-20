import React, { useContext, useCallback } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';

const InputTextareaP = ({ input, onChange, value, placeholder, type, ...rest }) => {
    const globalContext = useContext(GlobalContext);
    const { onChange: inputOnChange } = input;
    const { t } = globalContext;
    const handleOnChange = useCallback(
        (e) => {
            if (onChange) {
                onChange(e, { name: e.target.name, value: e.target.value });
            } else {
                inputOnChange(e.target.value);
            }
        },
        [ inputOnChange, onChange ]
    );
    return (
        <textarea
            className={'input inputP ' + type}
            value={value}
            {...rest}
            {...input}
            onChange={handleOnChange}
            placeholder={t(placeholder)}
        />
    );
};

export default InputTextareaP;
