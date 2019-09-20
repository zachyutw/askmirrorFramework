
import  { useState,useCallback} from 'react';

const useGoogleMap = (API, el, config, params = '&libraries=places,geometry&language=en_us') => {
    const [ state ] = useLoadScript({
        src: `https://maps.googleapis.com/maps/api/js?key=${API}${params}`,
        async: true,
        defer: true
    });
    const { condition: { isSuccess } } = state;
    const [ map, setMap ] = useState(null);
    const [ marker, setMarker ] = useState(null);
    const initMap = useCallback(
        () => {
            if (isSuccess) {
                const map = new window.google.maps.Map(el, config)
                setMap(map);
                setMarker(new window.google.maps.Marker({ position: map.getCe}))
            }
        },
        [ isSuccess ]
    );
    const createMarker = useCallback(
        (config) => {
            if (isSuccess && map) {
                return new window.google.maps.Marker({ config, map });
            }
        },
        [ isSuccess, map ]
    );
    useEffect(
        () => {
            if (isSuccess) {
                initMap();
            }
        },
        [ isSuccess ]
    );

    return { map, marker, initMap, createMarker };
};