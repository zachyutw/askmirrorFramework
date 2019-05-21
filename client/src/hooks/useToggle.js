import React, { useState, useCallback } from 'react';

const useToggle = (initState) => {
    const [ actived, setActived ] = useState(initState);
    const toggleActived = useCallback(
        () => {
            setActived((actived) => !actived);
        },
        [ toggleActived ]
    );
    return [ actived, toggleActived, setActived ];
};

export default useToggle;
