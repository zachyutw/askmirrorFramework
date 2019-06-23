import { useEffect, useReducer, useState, useCallback } from 'react';
import { initRespError } from './redux.hook';


const GeoJsonPoint = (coordinates, name) => ({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates
    },
    properties: {
        name
    }
});

const initState = {
    coordinates: [ -123.145575, 49.2695179 ],
    lng: -123.145575,
    lat: 49.2695179,
    geoJsonGPS: GeoJsonPoint([ -123.145575, 49.2695179 ], 'currentLocation')
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'start':
            return { ...state, ...action };
        case 'success':
            const lat = action.coords.latitude;
            const lng = action.coords.longitude;
            return { ...state, type: action.type, condition: action.condition, lat, lng, coordinates: [ lng, lat ], geoJsonGPS: GeoJsonPoint([ lng, lat ], 'currentLocation') };
        case 'fail':
            return { ...state, ...action };
        default:
            return { ...state };
    }
};

const dispatchAction = (dispatch) => (config = {}) => {
    dispatch({ type: 'start', condition: { isSuccess: null, isLoading: true } });
    navigator.geolocation.getCurrentPosition(
        (position) => {
            dispatch({ type: 'success', condition: { isSuccess: true, isLoading: false }, coords: position.coords });
        },
        (err) => {
            dispatch({ type: 'fail', condition: { isSuccess: false, isLoading: false }, error: initRespError(err) });
        },
        config
    );
    return {};
};

const useGPS = (propActived) => {
    const [ actived, setActived ] = useState(propActived);
    const [ config, setConfig ] = useState({
        enableHighAccuracy: false,
        timeout: 600000,
        maximumAge: 1000000
    });
    const [ state, dispatch ] = useReducer(reducer, initState);
    const getGPS = useCallback(dispatchAction(dispatch), [ dispatch, dispatchAction ]);
    useEffect(
        () => {
            if (navigator.geolocation) {
                if (actived) {
                    getGPS(config);
                }
            } else {
                dispatch({ type: 'error', condition: { isSuccess: false, isLoading: false }, error: initRespError({ message: 'not support gps' }) });
            }
        },
        [ actived ]
    );
    return [ state, setActived, setConfig ];
};

export default useGPS;
