import React, { useCallback, useEffect } from 'react';
import useToggle from '../../../hooks/useToggle';
import withPortal from '../../Portal/withPortal';

const Screen = ({ className, children, actived, onClose }) => {
    return (
        <div className={[ 'modal', actived ? 'show' : 'hidden', className ].join('  ')}>
            <div className={[ 'content' ].join('  ')}>{children}</div>
            <div className='bg' onClick={onClose} />
        </div>
    );
};
export default withPortal(Screen);
