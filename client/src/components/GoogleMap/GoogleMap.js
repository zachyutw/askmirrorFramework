import React from 'react';
import GoogleMapReact from 'google-map-react';
import useLoadScript from '../../../hooks/useLoadScript';

const GeoMapGoogle = ({ center, zoom }) => {
    const [ state, err ] = useLoadScript({
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAqktK3Bn0X_crTUxf-e2HainKBro5J-JA&libraries=places,geometry&language=en_us',
        async: true,
        defer: true
    });

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <div id='map' />
            {/* <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
                    // key: 'AIzaSyDZ38cWLe_55SXCV7Bhw-DH9T6yCPGbRLU'
                }}
                defaultCenter={center}
                defaultZoom={zoom}
            /> */}
        </div>
    );
};

export default GeoMapGoogle;
