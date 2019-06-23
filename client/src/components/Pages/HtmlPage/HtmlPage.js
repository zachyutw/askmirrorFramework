import React, { useEffect } from 'react';
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

const HtmlPage = () => {
    const [ state, setFetchUrl ] = useHtmlPreview('https://loveky.github.io/2018/06/05/unit-testing-react-component-with-jest/');
    const [ actived, setActived ] = useModal(false);
    const [ clipboard ] = useClipboard();
    const { url } = clipboard;
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

    return (
        <Layout>
            <PageP>
                <SectionP className='container ui'>
                    <div className='ui segment'>
                        <h1>Html</h1>
                    </div>
                    <ModalNotification actived={actived} setActived={setActived}>
                        <NotificationMessage icon='check' text='Success' />
                    </ModalNotification>
                    <div style={{ position: 'relative' }}>
                        <iframe srcDoc={__html} width='100%' height='500px' sandbox='' />
                        {/* <div dangerouslySetInnerHTML={{ __html }} /> */}
                    </div>
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default HtmlPage;
