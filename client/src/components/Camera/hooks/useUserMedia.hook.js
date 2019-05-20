import { useState, useMemo, useCallback, useEffect } from 'react';
const connectCamera = (dispatch, constraints) => {
    try {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                // videoRef.current.srcObject = stream;
                console.log(navigator.mediaDevices.enumerateDevices());
                dispatch({ type: 'localStream', stream });
                return navigator.mediaDevices.enumerateDevices();
            })
            .then((deviceInfos) => {
                dispatch({ type: 'deviceInfos', deviceInfos });
            })
            .catch((err) => console.log(err));
    } catch (err) {
        alert(err.message);
    }
};
const useUserMedia = () => {
    const [ userMedia, setUserMedia ] = useState({});
    const [ isFacingModeUser, setIsFacingModeUser ] = useState(true);
    const updateUserMedia = useCallback(
        (action) => {
            setUserMedia((state) => ({ ...state, ...action }));
        },
        [ setUserMedia ]
    );
    const constraints = useMemo(
        () => {
            updateUserMedia({ type: 'isFacingModeUser', isFacingModeUser });
            return {
                audio: { deviceId: undefined },
                video: {
                    facingMode: isFacingModeUser ? 'user' : 'environment',
                    width: { ideal: 4096 },
                    height: { ideal: 2160 }
                }
            };
        },
        [ isFacingModeUser, updateUserMedia ]
    );

    useEffect(
        () => {
            connectCamera(updateUserMedia, constraints);
        },
        [ constraints, updateUserMedia ]
    );
    const userMediaCrontol = useMemo(
        () => ({
            connect: () => {
                connectCamera(updateUserMedia, constraints);
            },
            toggleCamera: () => {
                setIsFacingModeUser((state) => !state);
            },
            stop: () => {
                userMedia.stream.getTracks().map((mediaStreamTrack) => {
                    mediaStreamTrack.stop();
                });
            }
        }),
        [ userMedia, setIsFacingModeUser, updateUserMedia ]
    );
    return [ userMedia, userMediaCrontol ];
};

export default useUserMedia;
