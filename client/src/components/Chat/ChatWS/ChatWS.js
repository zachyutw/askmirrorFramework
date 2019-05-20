import React, { useState, useCallback, useContext } from 'react';
import WSQueueContext, { withWSQueue } from '../../../contexts/WebSocket/WSQueueContext2';
import InputField from '../../Input/InputField/InputField';
import s from './ChatWS.module.css';

const ChatWs = (props) => {
    const wsQueueContext = useContext(WSQueueContext);
    const { coversationSet, sendText, poolUsers = [], pool = [] } = wsQueueContext;
    const [ socketText, setSocketText ] = useState('');
    const [ selected, setSelected ] = useState(null);
    const handleOnChange = useCallback((e, data) => {
        if (data.name === 'message') {
            setSocketText(data.value);
        }
    }, []);
    const handleOnSubmit = useCallback(
        () => {
            console.log(selected);
            if (selected) {
                sendText(socketText, selected);
            }
            // console.log(socketText);
        },
        [ socketText, sendText, selected ]
    );
    console.log(wsQueueContext);
    console.log([ ...coversationSet ]);

    return (
        <div>
            <div className={s.chatArea}>
                <div className={s.conversations}>
                    {[ ...coversationSet ].reverse().map(({ sendFrom, text }, index) => (
                        <div key={index} className={s.item}>
                            <div className={[ s.sendFrom ].join(' ')}>{sendFrom ? sendFrom.displayName : 'Server'}</div>
                            <div>{' : '}</div>
                            <div className={s.text}>{text}</div>
                        </div>
                    ))}
                </div>
                <div className={s.userList}>
                    {poolUsers.map(({ id: userId, avatar, displayName }, index) => (
                        <div
                            className={[
                                'item',
                                s.item,
                                selected === pool[index] ? 'selected' : '',
                                userId === sessionStorage.getItem('appId') ? 'self' : ''
                            ].join('  ')}
                            onClick={() => setSelected(pool[index].id)}
                            key={index}
                        >
                            <div className={s.avator}>
                                <img src={avatar} alt='avator' />
                            </div>
                            <div className={s.name}>{displayName}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={s.sendInput}>
                <InputField onChange={handleOnChange} fieldType='inputP' name='message' text='test' icon='add' />
                <button className='ui button' disabled={!selected} type='button' onClick={handleOnSubmit}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default withWSQueue(ChatWs);
