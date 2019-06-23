import React, { useContext } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
const ItemP = ({ className, icon, src, text, children, ...rest }) => {
    const globalContext = useContext(GlobalContext);
    const { t } = globalContext;
    return (
        <div className={[ 'className', className ].join(' ')} {...rest}>
            <span className={[ icon ? 'icon' : 'hidden' ].join(' ')}>
                <i className={[ 'ui icon', icon ].join(' ')} />
            </span>
            <div className={src ? 'img' : 'hidden'}>
                <img className='cover' src={src} />
            </div>
            <div className='content'>
                <div className='text'>{t(text)}</div>
                {children}
            </div>
        </div>
    );
};

export default React.memo(ItemP);
