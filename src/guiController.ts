import { Singleton } from "./core/singleton";
import * as dat from 'dat.gui';

export class GuiController extends Singleton<GuiController>{
    private gui_: dat.GUI;

    public posx_:number;
    public posy_:number;
    public posz_:number;
    public intensity_:number;
    public rotate_:boolean;

    public model_1_:boolean;
    public model_2_:boolean;
    public model_3_:boolean;
    public model_4_:boolean;
    public model_5_:boolean;
    public model_6_:boolean;
    public model_7_:boolean;
    public model_8_:boolean;
    public model_9_:boolean;
    public model_10_:boolean;
    public model_11_:boolean;
    public model_12_:boolean;

    public isPostEffect_:boolean;
    public isChangeBloomValue_:boolean;
    public strength_:number;
    public radius_:number;
    public threshold_:number;

    public constructor(){
        super();

        this.posx_ = 0.0;
        this.posy_ = 0.0;
        this.posz_ = 0.0;
        this.intensity_ = 0.5;
        this.rotate_ = false;

        this.model_1_ = true;
        this.model_2_ = false;
        this.model_3_ = false;
        this.model_4_ = false;
        this.model_5_ = false;
        this.model_6_ = false;
        this.model_7_ = false;
        this.model_8_ = false;
        this.model_9_ = false;
        this.model_10_ = false;
        this.model_11_ = false;
        this.model_12_ = false;

        this.isChangeBloomValue_ = false;
        this.isPostEffect_ = false;
        this.strength_ = 1.4;
        this.radius_ = 0.78;
        this.threshold_ = 0.14;

        this.gui_ = new dat.GUI();

        let controls = new (function() {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            this.intensity = 0.5;
            this.rotate = false;
            this.model_1 = true;
            this.model_2 = false;
            this.model_3 = false;
            this.model_4 = false;
            this.model_5 = false;
            this.model_6 = false;
            this.model_7 = false;
            this.model_8 = false;
            this.model_9 = false;
            this.model_10 = false;
            this.model_11 = false;
            this.model_12 = false;

            this.isPostEffect = false;
            this.strength = 1.4;
            this.radius = 0.78;
            this.threshold = 0.14;
        });

        let pos = this.gui_.addFolder("Position");
        pos.add(controls, 'x', -10.0, 10.0).onChange((e)=>{
            this.posx_ = e
            console.log('posx ' + this.posx_ + ': e ' + e);
        });
        pos.add(controls, 'y', -10.0, 10.0).onChange((e)=>{
            this.posy_ = e;
            console.log('posy ' + this.posy_+ ': e ' + e);
        });
        pos.add(controls, 'z', -10.0, 10.0).onChange((e)=>{
            this.posz_ = e;
            console.log('posz ' + this.posz_+ ': e ' + e);
        });
        let light = this.gui_.addFolder("Directional_Light");
        light.add(controls, 'intensity', 0.0, 10.0).onChange((e)=>{
            this.intensity_ = e;
        });
        let rotate = this.gui_.addFolder("Model Rotate");
        rotate.add(controls, 'rotate').onChange((e)=>{
            this.rotate_ = e;
        });
        let visible = this.gui_.addFolder("Model Visible");
        visible.add(controls, 'model_1').onChange((e)=>{
            this.model_1_ = e;
        });
        visible.add(controls, 'model_2').onChange((e)=>{
            this.model_2_ = e;
        });
        visible.add(controls, 'model_3').onChange((e)=>{
            this.model_3_ = e;
        });
        visible.add(controls, 'model_4').onChange((e)=>{
            this.model_4_ = e;
        });
        visible.add(controls, 'model_5').onChange((e)=>{
            this.model_5_ = e;
        });
        visible.add(controls, 'model_6').onChange((e)=>{
            this.model_6_ = e;
        });
        visible.add(controls, 'model_7').onChange((e)=>{
            this.model_7_ = e;
        });
        visible.add(controls, 'model_8').onChange((e)=>{
            this.model_8_ = e;
        });
        visible.add(controls, 'model_9').onChange((e)=>{
            this.model_9_ = e;
        });
        visible.add(controls, 'model_10').onChange((e)=>{
            this.model_10_ = e;
        });
        visible.add(controls, 'model_11').onChange((e)=>{
            this.model_11_ = e;
        });
        visible.add(controls, 'model_12').onChange((e)=>{
            this.model_12_ = e;
        });


        let bloom = this.gui_.addFolder("Bloom");
        bloom.add(controls, 'isPostEffect').onChange((e)=>{
            this.isPostEffect_ = e;
        });
        bloom.add(controls, 'strength', 0, 3).onChange((e)=>{
            this.strength_ = e;
            this.isChangeBloomValue_ = true;
        });
        bloom.add(controls, 'radius', 0, 1).onChange((e)=>{
            this.radius_ = e;
            this.isChangeBloomValue_ = true;
        });
        bloom.add(controls, 'threshold', 0, 1).onChange((e)=>{
            this.threshold_ = e;
            this.isChangeBloomValue_ = true;
        });
    }

}