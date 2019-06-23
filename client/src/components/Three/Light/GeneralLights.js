import { PointLight } from 'three';
function GeneralLights (scene){
    const light = new PointLight('#2222ff', 1);
    scene.add(light);

    this.update = function (time){
        light.intensity = (Math.sin(time) + 50) / 50;
        light.color.setHSL(Math.sin(time), 0.5, 0.5);
    };
}
export default GeneralLights;
