// import bk from '../../../static/skybox/01/bk.jpg';
// import dn from '../../../static/skybox/01/dn.jpg';
// import ft from '../../../static/skybox/01/ft.jpg';
// import lf from '../../../static/skybox/01/lf.jpg';
// import rt from '../../../static/skybox/01/rt.jpg';
// import up from '../../../static/skybox/01/up.jpg';
import bk from './imgs/bk.jpg';
import dt from './imgs/dt.jpg';
import ft from './imgs/ft.jpg';
import lf from './imgs/lf.jpg';
import rt from './imgs/rt.jpg';
import up from './imgs/up.jpg';
import _ from 'lodash';
import { TextureLoader, MeshBasicMaterial, Mesh, BoxGeometry, BackSide } from 'three';
const imgs = [ ft, bk, up, dt, rt, lf ];
const textures = _.map(imgs, (img) => new TextureLoader().load(img));
const materialArray = _.map(textures, (texture) => new MeshBasicMaterial({ map: texture }));
materialArray.map((material) => {
    console.log(material);
    material.side = BackSide;
});
const skyboxGeo = new BoxGeometry(10000, 10000, 10000);

const skybox = new Mesh(skyboxGeo, materialArray);

export default skybox;
