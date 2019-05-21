import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';
import ScreenP from '../../Screen/ScreenP/ScreenP';
import s from './ButtonMenu.module.css';
const navmainField = {
    home: { name: 'home', value: '/home', text: 'Home' },
    app: { name: 'app', value: '/', text: 'App' }
};
const navmainFields = Object.values(navmainField);

const ItemP = ({ name, value, text, icon, onClick }) => {
    const [ actived, toggleActived ] = useToggle(false);
    const handleOnClick = useCallback(
        (e) => {
            toggleActived();
            if (onClick) {
                onClick(e, { name, value });
            }
        },
        [ onClick, actived, toggleActived ]
    );
    return (
        <div className={[ 'item', actived ? 'actived' : '' ].join(' ')} onClick={handleOnClick}>
            {text}
        </div>
    );
};
const Navmain = withRouter((props) => {
    console.log(props);
    const handleOnClick = useCallback((e, data) => {
        console.log(data);
    }, []);
    return <div className='navmain'>{navmainFields.map((field, index) => <ItemP onClick={handleOnClick} {...field} key={index} />)}</div>;
});

const ButtonMenu = React.memo(({ onClick, name, value }) => {
    const [ actived, toggleActived ] = useToggle(true);
    const handleOnClick = useCallback(
        (e) => {
            toggleActived();
            if (onClick) {
                onClick(e, { name, value: actived });
            }
        },
        [ onClick, actived, toggleActived ]
    );
    console.log(actived);
    return (
        <React.Fragment>
            <div className='menu  iconBtn rotateChange ' onClick={handleOnClick}>
                <i className={[ 'ui icon', actived ? 'actived bars' : 'enactived times' ].join(' ')} />
            </div>
            <ScreenP className={[ 'light0', s.modal ].join(' ')} actived={!actived} onClose={handleOnClick}>
                <Navmain />
            </ScreenP>
        </React.Fragment>
    );
});

export default ButtonMenu;
