import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';
import threeEntryPoint from '../../Three/ThreeEntryPoint';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import _ from 'lodash';
import useToggle from '../../../hooks/useToggle';

const useThreeCamera = (cameraConfig = {}) => {
    const [ config, setConfig ] = useState(cameraConfig);

    const camera = useMemo(
        () => {
            const { fov = 55, aspect = window.innerWidth / window.innerHeight, near = 45, far = 3000, x = -900, y = -200, z = -900 } = config;
            const pCamera = new PerspectiveCamera(fov, aspect, near, far);
            pCamera.position.x = x;
            pCamera.position.y = y;
            pCamera.position.z = z;
            return pCamera;
        },
        [ config ]
    );

    const scene = useMemo(() => {
        return new Scene();
    }, []);

    return [ camera, scene, setConfig ];
};
const useThreeRenderer = (rendererConfig = {}) => {
    const [ config, setConfig ] = useState(rendererConfig);
    const renderer = useMemo(
        () => {
            const { color = '#CCCCCC', width = window.innerWidth, height = window.innerHeight, webgl = { antialias: true } } = config;
            const _renderer = new WebGLRenderer(webgl);
            _renderer.setClearColor(color);
            _renderer.setSize(width, height);
            return _renderer;
        },
        [ config ]
    );
    return [ renderer, setConfig ];
};

let frameId;
let frameId2;
const CubeBox = (color) => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color });
    const mesh = new Mesh(geometry, material);
    return mesh;
};
const cube = CubeBox('#433F81');
const cube2 = CubeBox('red');

const ThreeContainer = () => {
    const threeRef = useRef(null);

    useEffect(() => {
        threeEntryPoint(threeRef.current);
    }, []);
    return <div style={{ height: '40em' }} ref={(el) => (threeRef.current = el)} />;
};
const ThreePage = () => {
    return (
        <div>
            <ThreeContainer />
            <Layout>
                <PageP>
                    <SectionP />
                </PageP>
            </Layout>
        </div>
    );
};

export default ThreePage;
