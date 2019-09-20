import React, { useContext, useCallback, useState, useRef, useEffect, useMemo } from 'react';
import GeocationContext, { withGeocation } from '../../../contexts/Geocation/GeocationContext';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';
import './AppPage.css';
import s from './AppPage.module.css';

const Exsit = ({ exist, children, className, ...rest }) => {
    return (
        <div className={[ className, exist ? '' : 'hidden' ]} {...rest}>
            {children}
        </div>
    );
};

// const socket = io('http://localhost:5000');
const CoverImage = ({ src }) => {
    const handleOnLoad = useCallback((e) => {
        console.log(e);
    }, []);
    return <img onLoad={handleOnLoad} src={src} />;
};
const ItemP = ({ src, icon, children, text, className, ...rest }) => {
    return (
        <div className={[ 'itemP', className ].join(' ')}>
            <div className={s.img}>
                <Exsit exsit={src} className={s.cover}>
                    <CoverImage src={src} />
                </Exsit>
                <Exsit exsit={icon} className={s.icon}>
                    <i className={[ 'icon', icon ].join(' ')} />
                </Exsit>
                <div className='itemContent'>
                    <div>{text}</div>
                </div>
                {children}
            </div>
        </div>
    );
};
const App = (props) => {
    const { index } = useContext(GeocationContext);

    return (
        <Layout>
            <PageP>
                {/* <CameraUserMedia /> */}
                <div className='ui container' />
            </PageP>
        </Layout>
    );
};

export default App;
