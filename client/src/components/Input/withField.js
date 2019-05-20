import React, { useMemo, useCallback } from 'react';
import { pickByIdentity } from '../../lib/obj.helper';

export const withField = (Component) => (props) => {
    const { input = {}, className, meta, name, onChange, defaultValue, ...rest } = props;

    const metaClassNames = useMemo(() => pickByIdentity(meta), [ meta ]);
    const { onChange: inputOnChange } = input;
    const handleOnChange = useCallback(
        (e, data) => {
            if (onChange) {
                onChange(e, { ...data });
            } else if (inputOnChange) {
                inputOnChange(data.value);
            }
        },
        [ inputOnChange, onChange ]
    );
    return (
        <Component
            {...rest}
            className={[ className, metaClassNames ].join(' ')}
            input={{ name, value: defaultValue, ...input, onChange: handleOnChange }}
        />
    );
};
