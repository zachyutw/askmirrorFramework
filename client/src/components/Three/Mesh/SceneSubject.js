import { IcosahedronBufferGeometry, MeshStandardMaterial, Mesh } from 'three';
import skybox from '../Skybox/skybox';
import sword from './sword';
import IronManObj from './IronMan.obj';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
// import {} from 'three/examples/jsm/loaders/';
const loader = new OBJLoader2();

function initContext (){
    var modelName = 'female02';
    var scope = this;
    var objLoader = new OBJLoader2();
    var callbackOnLoad = function (event){
        scope.scene.add(event.detail.loaderRootNode);
        console.log('Loading complete: ' + event.detail.modelName);
        scope._reportProgress({ detail: { text: '' } });
    };
    var onLoadMtl = function (materials){
        console.log('123');
        objLoader.setModelName(modelName);
        objLoader.setMaterials(materials);
        objLoader.setLogging(true, true);
        objLoader.load('/IronMan.obj', callbackOnLoad, null, null, null, false);
    };

    objLoader.loadMtl('/IronMan.mtl', null, (materials) => console.log(materials));
}

function SceneSubject (scene){
    const radius = 30;
    const mesh = new Mesh(new IcosahedronBufferGeometry(radius, 3), new MeshStandardMaterial({ flatShading: true }));

    mesh.position.set(10, 0, 90);

    // loader.load(IronManObj, (object) => {
    //     scene.add(object);
    //     console.log(object);
    // });
    scene.add(skybox);
    scene.add(mesh);
    // initContext();
    // scene.add(sword);
    this.update = function (time){
        const scale = Math.sin(time) + 2;

        mesh.scale.set(scale, scale, scale);
    };
}
export default SceneSubject;
