import React, { useContext, useCallback, useMemo } from 'react';

import { pickByIdentity } from '../../../lib/obj.helper';
import GlobalContext, { withGlobal } from '../../../contexts/Global/GlobalContext';
const InputFieldPre = (props) => {
    const {
        label,
        placeholder,
        type,
        name,
        onChange,
        value,
        input,
        meta = {},
        uncontrol,
        className,
        fieldType,
        style,
        ...rest
    } = props;
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    const handleOnChange = useCallback((e) => {
        if (onChange) {
            onChange(e, { name: e.target.name, value: e.target.value });
        } else if (input) {
            input.onChange(e.target.value);
        }
    }, []);
    const metaClassNames = useMemo(() => pickByIdentity(meta), [ meta ]);
    return (
        <div className={[ 'field', className, metaClassNames ].join(' ')} style={{ style }} {...rest}>
            <div className='content'>
                <label>{t(label)}</label>
                <input placeholder={t(placeholder)} name={name} type={type} {...input} onChange={handleOnChange} />
            </div>
            <div className='meta' />
        </div>
    );
};

const InputField = withGlobal(React.memo(InputFieldPre));

export default InputField;
