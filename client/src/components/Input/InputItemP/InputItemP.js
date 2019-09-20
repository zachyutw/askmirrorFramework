import React, { useContext, useState, useCallback, useMemo } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import { withField } from '../withField';
const InputItemSelectionP = ({ input = {}, options = [], className, renderProp: RenderProp, children: Children, ...rest }) => {
    const { onChange, name, value } = input;
    const [ selected, setSelected ] = useState(value);

    const handleOnChange = useCallback(
        (e, data) => {
            setSelected(data.value);
            onChange(e, { ...data, name });
        },
        [ onChange, name ]
    );
    return (
        <div className={[ 'itemSelection', className ].join(' ')} {...rest}>
            {options.map((option, index) => (
                <WithFieldInputItemP key={index} name='item' {...option} render={RenderProp && <RenderProp {...option} onChange={onChange} />} className={option.value === selected ? 'selected' : ''} onChange={handleOnChange}>
                    {Children && <Children {...option} onChange={onChange} />}
                </WithFieldInputItemP>
            ))}
        </div>
    );
};

const WithFieldInputItemSelectionP = withField(InputItemSelectionP);

const InputItemP = ({ actionType, input = {}, text, style, className, ref, to, innerRef, replace, icon, render, children, ...rest }) => {
    const [ actived, setActived ] = useState(false);
    const { onChange, name, value } = input;
    const handleOnClick = useCallback(
        (e) => {
            setActived(true);
            onChange(e, { actionType, name, value, to, innerRef, replace });
        },
        [ onChange, name, value, to, innerRef, replace, actionType ]
    );
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    const renderContent = useMemo(
        () => {
            if (children) {
                return children;
            } else if (render) {
                return render;
            } else {
                return (
                    <div className='content'>
                        {icon && <i className={[ icon, 'icon' ].join(' ')} />}
                        <div className='text'>{t(text)}</div>
                    </div>
                );
            }
        },
        [ children, render, icon, text, t ]
    );
    return (
        <div name={name} ref={ref} {...rest} className={[ className, 'item', actived ? 'active' : '' ].join(' ')} onClick={handleOnClick} style={{ cursor: 'pointer', ...style }}>
            {renderContent}
        </div>
    );
};

const WithFieldInputItemP = withField(InputItemP);
WithFieldInputItemP.Selection = WithFieldInputItemSelectionP;

export default WithFieldInputItemP;
