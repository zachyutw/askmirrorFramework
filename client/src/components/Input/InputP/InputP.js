import React, { useContext, useCallback } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import { withField } from '../withField';
const InputP = ({ placeholder, input = {}, ...rest }) => {
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    const { onChange, name } = input;
    const handleOnChange = useCallback(
        (e) => {
            onChange(e, { name: e.target.name, value: e.target.value });
        },
        [ onChange ]
    );
    return <input placeholder={t(placeholder)} name={name} {...rest} {...input} onChange={handleOnChange} />;
};

export default withField(InputP);
