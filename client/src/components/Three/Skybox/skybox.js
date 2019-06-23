// import bk from '../../../static/skybox/01/bk.jpg';
// import dn from '../../../static/skybox/01/dn.jpg';
// import ft from '../../../static/skybox/01/ft.jpg';
// import lf from '../../../static/skybox/01/lf.jpg';
// import rt from '../../../static/skybox/01/rt.jpg';
// import up from '../../../static/skybox/01/up.jpg';
import bk from './imgs/';
import dn from './imgs/dn.bmp';
import ft from './imgs/ft.bmp';
import lf from './imgs/lf.bmp';
import rt from './imgs/rt.bmp';
import up from './imgs/up.bmp';
import _ from 'lodash';
import { TextureLoader, MeshBasicMaterial, Mesh, BoxGeometry, BackSide } from 'three';
const imgs = [ ft, bk, up, dn, rt, lf ];
const textures = _.map(imgs, (img) => new TextureLoader().load(img));
const materialArray = _.map(textures, (texture) => new MeshBasicMaterial({ map: texture }));
materialArray.map((material) => {
    console.log(material);
    material.side = BackSide;
});
const skyboxGeo = new BoxGeometry(10000, 10000, 10000);

const skybox = new Mesh(skyboxGeo, materialArray);

export default skybox;
