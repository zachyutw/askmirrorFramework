import React from 'react';
import s from './NotificationMessage.module.css';
import ItemP from '../../App/ItemP/ItemP';

const NotificationMessage = (props) => {
    return <ItemP className={s.message} {...props} />;
};
export default React.memo(NotificationMessage);
