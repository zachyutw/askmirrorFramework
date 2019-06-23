import React, { useContext, useCallback } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import ModalSidebar from '../../Modal/ModalSidebar/ModalSidebar';
import Navmain from '../../Nav/Navmain/Navmain';
import useModal from '../../../hooks/useModal';
import s from './ButtonMenu.module.css';

const ButtonMenu = React.memo(({ onClick, name, value }) => {
    const [ actived, setActived ] = useModal(false);
    const globalContext = useContext(GlobalContext);
    const handleOnClick = useCallback(
        (e) => {
            setActived((state) => !state);
            if (onClick) {
                onClick(e, { name, value: actived });
            }
        },
        [ onClick, actived, setActived, name ]
    );

    // console.log(globalContext);
    return (
        <React.Fragment>
            <div className='menu  iconBtn rotateChange ' onClick={handleOnClick}>
                <i className={[ 'ui icon', !actived ? 'actived bars' : 'enactived times' ].join(' ')} />
            </div>
            <ModalSidebar actived={actived} setActived={setActived}>
                <Navmain />
            </ModalSidebar>
        </React.Fragment>
    );
});

export default ButtonMenu;
