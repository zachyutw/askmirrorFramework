import meta from './sword-01.json';
import _ from 'lodash';
import { ObjectLoader } from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
const loader = new OBJLoader2();

let sword = {};
loader.load('/low-poly-fox-by-pixelmannen.json', (object) => {
    sword = object;
});

export default sword;
