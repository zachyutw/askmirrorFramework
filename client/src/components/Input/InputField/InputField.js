import React, { useContext, useCallback, useMemo } from 'react';
import { getMetaClassNames } from '../../FinalForm/finalForm';
import GlobalContext, { withGlobal } from '../../../contexts/Global/GlobalContext';
const InputFieldPre = (props) => {
    const {
        label,
        placeholder,
        type,
        name,
        onChange = (e, data) => console.log(data),
        value = '',
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
        onChange(e, { name: e.target.name, value: e.target.value });
    }, []);
    const metaClassNames = useMemo(() => getMetaClassNames(meta), [ meta ]);
    const renderInput = useMemo(
        () => {
            if (input) {
                return <input placeholder={t(placeholder)} name={name} type={type} {...input} />;
            } else {
                return (
                    <input
                        {...rest}
                        type={type}
                        placeholder={t(placeholder)}
                        name={name}
                        onChange={handleOnChange}
                        value={value}
                    />
                );
            }
        },
        [ placeholder, name, input, rest, type, value ]
    );

    return (
        <div className={[ 'field', className, metaClassNames ].join(' ')} style={{ style }}>
            <div className='content'>
                <label>{t(label)}</label>
                {renderInput}
            </div>
            <div className='meta' />
        </div>
    );
};

const InputField = withGlobal(React.memo(InputFieldPre));

export default InputField;
