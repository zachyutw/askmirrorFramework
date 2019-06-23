import React, { useEffect, useCallback } from 'react';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';
import useHtmlPreview from '../../../hooks/useHtmlPreview';
import useClipboard from '../../../hooks/useClipboard';
import ModalNotification from '../../Modal/ModalNotification/ModalNotification';
import NotificationMessage from '../../Notification/NotificationMessage/NotificationMessage';
import useModal from '../../../hooks/useModal';
import { delay } from '../../../lib';
import _ from 'lodash';
const HomePage = () => {
    const [ state, setFetchUrl ] = useHtmlPreview('https://www.forbes.com/sites/jamiecartereurope/2018/09/26/face-east-this-weekend-to-eye-the-trillion-star-andromeda-galaxy/#3ba58de56882');
    const [ actived, setActived ] = useModal(false);
    const [ clipboard ] = useClipboard();
    const { url, imageUrl } = clipboard;
    useEffect(
        () => {
            if (url) {
                delay(1000).then(() => {
                    setFetchUrl(url);
                });
            }
        },
        [ url ]
    );
    const { __html } = state;
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
                <SectionP absolute parallax={{ minHight: '20rem', backgroundImage: `url('${imageUrl ? imageUrl : 'https://i.imgur.com/4ocGQRk.jpg'} ')` }} className='container ui'>
                    <div className='ui segment'>
                        <h1>Home</h1>
                    </div>
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default HomePage;
