import React, { useEffect, useRef, useState, useCallback } from 'react';
import _ from 'lodash';
import s from './CameraUserMedia.module.css';
import { delay, snapVideo } from '../../../lib';
import useUserMedia from '../hooks/useUserMedia.hook';
import ButtonP from '../../App/ButtonP/ButtonP';

const controlFieldObj = {
    snap: { name: 'snap', text: 'Snap' },
    stop: { name: 'stop', text: 'Stop' },
    connect: { name: 'connect', text: 'Start' },
    toggleCamera: { name: 'toggleCamera', text: 'Turn' },
    pause: { name: 'pause', text: 'Pause' }
};
const controlFields = _.values(controlFieldObj);
const Camera = ({ onChange = (e, data) => console.log(data) }) => {
    const PREVIEW_IMG_DURATION = 12000;
    const videoRef = useRef(null);
    // console.log(window.performance.now());
    const [ snapImageUrl, setSnapImageUrl ] = useState(null);
    const [ userMedia, userMediaCrontol ] = useUserMedia();
    const { stream: userMediaStream, isFacingModeUser } = userMedia;
    useEffect(
        () => {
            console.log(videoRef.current);
            if (videoRef) {
                delay(1000).then(() => {
                    videoRef.current.srcObject = userMediaStream;
                });
            }
        },
        [ userMediaStream, videoRef ]
    );
    const controlActions = useCallback(
        (actionName) => {
            switch (actionName) {
                case 'stop':
                    userMediaCrontol.stop();
                    break;
                case 'snap':
                    const imageUrl = snapVideo(videoRef.current);
                    setSnapImageUrl(null);
                    delay(300).then(() => {
                        setSnapImageUrl(imageUrl);
                    });
                    break;
                case 'connect':
                    userMediaCrontol.connect();
                    break;
                case 'toggleCamera':
                    userMediaCrontol.toggleCamera();
                    break;
                case 'pause':
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                    break;
                default:
                    break;
            }
        },
        [ setSnapImageUrl, userMediaCrontol ]
    );
    const handleOnClick = useCallback(
        (e, data) => {
            controlActions(data.name);
        },
        [ controlActions ]
    );
    return (
        <div>
            <div className={[ s.localStream, isFacingModeUser ? 'mirror' : '' ].join(' ')}>
                {snapImageUrl && (
                    <div className={[ s.preview ].join(' ')} style={{ animationDuration: `${PREVIEW_IMG_DURATION}ms` }}>
                        <img className='cover' src={snapImageUrl} alt={snapImageUrl} />
                    </div>
                )}
                <div className={s.btns}>{controlFields.map((field, index) => <ButtonP onChange={handleOnClick} key={index} {...field} />)}</div>

                <video ref={videoRef} id='localVideo' playsInline autoPlay muted className='cover' />
            </div>
        </div>
    );
};

export default Camera;
