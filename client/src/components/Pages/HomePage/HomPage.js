import React, { useEffect, useCallback } from 'react';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';

import ModalNotification from '../../Modal/ModalNotification/ModalNotification';
import NotificationMessage from '../../Notification/NotificationMessage/NotificationMessage';
import useModal from '../../../hooks/useModal';
import { delay } from '../../../lib';
import s from './HomePage.module.css';
import _ from 'lodash';
const HomePage = () => {
    const [ actived, setActived ] = useModal(false);
    const handleOnClick = useCallback(
        (e) => {
            setActived((state) => !state);
        },
        [ setActived ]
    );
    return (
        <Layout>
            <PageP>
                <button onClick={handleOnClick}>Clicked</button>
                <ModalNotification actived={actived} setActived={setActived}>
                    <NotificationMessage icon='check' text='Success' />
                </ModalNotification>
                <SectionP absolute parallax={{ minHight: '20rem' }} className='container ui'>
                    <div className='ui segment'>
                        <h1>Home</h1>
                        <div className={s.img}>
                            <img className='isLoading' src='https://notfound.img' alt='not image' />
                        </div>
                    </div>
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default HomePage;
