import React, { useState, useCallback } from 'react';

const Editor = (props) => {
    const { component: Component, render: Render, onSubmit, defaultValue, ...rest } = props;
    const [ edit, setEdit ] = useState(false);
    const [ localValue, setValue ] = useState(defaultValue);

    const handleOnOpen = useCallback(() => {
        setEdit(true);
    }, []);

    const handleOnSubmit = useCallback(
        () => {
            setEdit(false);
            if (onSubmit) {
                onSubmit(localValue);
            }
        },
        [ onSubmit, localValue ]
    );
    const handleOnChange = useCallback((e, data) => {
        setValue(data.value);
    }, []);

    return (
        <div onDoubleClick={handleOnOpen}>
            {edit ? (
                <React.Fragment>
                    <Component {...rest} onChange={handleOnChange} defaultValue={defaultValue} />{' '}
                    <button onClick={handleOnSubmit} type='button' className='ui button'>
                        Edit
                    </button>
                </React.Fragment>
            ) : (
                <Render {...rest} text={localValue} value={localValue} defaultValue={localValue} />
            )}
        </div>
    );
};
export default Editor;
