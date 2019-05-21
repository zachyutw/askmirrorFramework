import React, { useState, useCallback } from 'react';

const SectionP = ({ children, toggle, className, ...rest }) => {
    const [ isOpen, setIsOpen ] = useState(true);
    const handleOnClick = useCallback(
        () => {
            if (toggle) {
                setIsOpen((isOpen) => !isOpen);
            }
        },
        [ toggle ]
    );
    return (
        <section className={[ isOpen ? 'hidden' : isOpen ].join(' ')}>
            <div onClick={handleOnClick} className={[ 'content', className ].join(' ')} {...rest}>
                {children}
            </div>
        </section>
    );
};
export default React.memo(SectionP);
