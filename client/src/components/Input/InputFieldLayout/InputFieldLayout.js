import React, { useContext, useMemo } from 'react';
import { pickByIdentity } from '../../../lib/obj.helper';
import GlobalContext from '../../../contexts/Global/GlobalContext';
const InputFieldLayout = ({ label, htmlFor, meta = {}, className, style, children }) => {
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    const metaClassNames = useMemo(() => pickByIdentity(meta), [ meta ]);
    return (
        <div className={[ 'field', className, metaClassNames ].join(' ')} style={{ style }}>
            <div className='content'>
                <label htmlFor={htmlFor}>{t(label)}</label>
                {children}
            </div>
            <div className='meta' />
        </div>
    );
};

export default InputFieldLayout;
