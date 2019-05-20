import React, { useState, useEffect } from 'react';

const userCamera = ({ onChange = (e, data) => console.log(data), constraints }) => {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            // videoRef.current.srcObject = stream;
            onChange(null, { name: 'stream', value: stream });
            return navigator.mediaDevices.enumerateDevices();
        })
        .then((deviceInfos) => {
            onChange(null, { name: 'deviceInfo', value: deviceInfos });
        })
        .catch((err) => console.log(err));
};
const useCamera = (config) => {
    const [ camera, setCamera ] = useState({ stream: null, deviceInfo: null });
    useEffect(() => {}, [ config ]);
    return camera;
};
