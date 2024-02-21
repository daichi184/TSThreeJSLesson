import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

import { Actor } from '../core/actor';
import { ModelActor } from '../core/modelActor';
import { CameraActor } from '../core/cameraActor';
import { DirectionalLightActor } from '../core/directionalLightActor';

import { Scene } from '../core/scene';
import { ResultScene } from './resultScene';
import { GuiController } from '../GuiController';


export class MainScene extends Scene{

    private cam_pos_: THREE.Vector3;
    private cam_rot_: THREE.Vector3;

    private cameraActor_: CameraActor;
    private dirLightActor_: DirectionalLightActor;

    private modelActor_: Actor[];
    private bAdded_:boolean;
    private isLoaded_:boolean;

    private orbitControls_: OrbitControls;
    // private pointerLockControls_: PointerLockControls;

    private gui_ = GuiController.getInstance(GuiController);

    private readonly MODEL_LEN:number = 12;

    private bCurDrawState_:boolean[] = new Array<boolean>(this.MODEL_LEN);


    private composer_: EffectComposer;
    private composer_1_: EffectComposer;
    private effectCopy_: ShaderPass;

    private clock_:THREE.Clock;
    // private prevTime_: number;

    public constructor(_renderer: THREE.WebGLRenderer){
        super(_renderer);  

        // シーンを作成
        this.scene_ = new THREE.Scene();

        // カメラを作成
        this.cam_pos_ = new THREE.Vector3(0, 10, 50);
        this.cam_rot_ = new THREE.Vector3(0, 0, 0);

        this.cameraActor_ = new CameraActor(this.scene_, _renderer, this.cam_pos_, this.cam_rot_, new THREE.Vector3(1, 1, 1));
        // this.orbitControls_ = new OrbitControls(this.cameraActor_.cameraComponent.camera, this.renderer_.domElement);
        // this.pointerLockControls_ = new PointerLockControls(this.cameraActor_.cameraComponent.camera, this.renderer_.domElement);
            
        for(let i=0; i<this.MODEL_LEN; i++){
            this.bCurDrawState_[i] = true;
        }

        this.bAdded_ = true;
        this.isLoaded_ = false;
    }   

    public setup() : void{
        console.log("MainScene Setup v1.3");

        this.reset();
        
        this.dirLightActor_ = new DirectionalLightActor(
            this.scene_
            , new THREE.Vector3(-40, 60, 10)
            , new THREE.Vector3(1, 1, 1)
            , new THREE.Vector3(1, 1, 1));

        let dir:string[] = new Array<string>(this.MODEL_LEN);
        dir[0] = './assets/model/model1/SpaceStation_1.glb';
        dir[1] = './assets/model/model2/Coffee_Cups.glb';
        dir[2] = './assets/model/model3/SpaceStation_2.glb';
        dir[3] = './assets/model/model4/SpaceStation_3.glb';
        dir[4] = './assets/model/model6/wooden crate.glb';
        dir[5] = './assets/model/model7/office_space.gltf';
        dir[6] = './assets/model/model8/car.glb';
        dir[7] = './assets/model/model9/Eames_chair.glb';
        dir[8] = './assets/model/model10/Truck01.gltf'
        dir[9] = "./assets/model/model11/shoes/Color_01/shoes_05.glb";
        // let url_12: string = "./assets/model/model11/shoes/Color_02/shoes_05.glb";
        dir[10] = "./assets/model/model12/mygltf.glb";
        dir[11] = "./assets/model/bloomBox.glb";


        this.modelActor_ = new Array<ModelActor>(this.MODEL_LEN);
        for(let i:number=0; i<this.MODEL_LEN; i++){
            this.modelActor_[i] = new ModelActor(this.scene_, dir[i]);
        }
        
        this.clock_ = new THREE.Clock();
        this.postEffectSetup(this.scene_, this.cameraActor_.cameraComponent.camera, this.renderer_);
    }

    public createPlaneMesh(_geom:THREE.PlaneGeometry):THREE.Mesh{
        let material:THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        let mesh = new THREE.Mesh(_geom, material);
        return mesh;
    }

    public update(): void{
        // this.orbitControls_.update();

        if(this.gui_.isChangeBloomValue_){
            this.bloomPassSetup();
            this.gui_.isChangeBloomValue_ = false;
        }

        if(!this.isLoaded_){
            this.isLoaded_ = this.isLoading();
            if(this.isLoaded_)
                this.addScene()
        }
        else{
            for(let i:number=0; i<this.MODEL_LEN; i++){
                if(this.gui_.rotate_ == true)
                    this.modelActor_[i].update();
                
                this.modelActor_[i].position = new THREE.Vector3(this.gui_.posx_ , this.gui_.posy_ , this.gui_.posz_);
            //    this.cameraActor_.cameraComponent.camera.position.set(this.gui_.posx_ , this.gui_.posy_ , this.gui_.posz_);  
            }
            this.cameraActor_.update();

            this.checkGUi();
        }

        this.dirLightActor_.dirLightComponent.intensity = this.gui_.intensity_;
        
        let delta = this.clock_.getDelta();

        // 描画
        if(!this.gui_.isPostEffect_)
            this.renderer_.render(this.scene_, this.cameraActor_.cameraComponent.camera);
        else           
            this.postEffectRender(delta);
    }

    private postEffectSetup(_scene:THREE.Scene, _camera:THREE.Camera, _renderer:THREE.WebGLRenderer):void{
        let renderPass = new RenderPass(_scene, _camera);
        this.effectCopy_ = new ShaderPass(CopyShader);
        this.effectCopy_.renderToScreen = true;
        
        this.composer_ = new EffectComposer(_renderer);
        this.composer_.addPass(renderPass);
        this.composer_.addPass(this.effectCopy_);
        
        this.bloomPassSetup();
    }

    private bloomPassSetup():void{
        let renderScene = new TexturePass(this.composer_.renderTarget1.texture);

        let resolution: THREE.Vector2 = new THREE.Vector2(innerWidth, innerHeight);
        let strength: number = this.gui_.strength_;
        let radius: number = this.gui_.radius_;
        let threshold:number = this.gui_.threshold_;
        let unrealBloomPass = new UnrealBloomPass(resolution, strength, radius, threshold);

        this.composer_1_ = new EffectComposer(this.renderer_);
        this.composer_1_.addPass(renderScene);
        this.composer_1_.addPass(unrealBloomPass);
        this.composer_1_.addPass(this.effectCopy_);
    }

    private postEffectRender(_delta:number):void{
        this.composer_.render(_delta);
        this.composer_1_.render(_delta);
    }

    private isLoading():boolean{
        console.log("LOADING");
        let isLoaded:boolean[] = new Array<boolean>(this.MODEL_LEN);
        let cnt:number = 0;
        for(let i=0; i<this.MODEL_LEN; i++){
            if((this.modelActor_[i] as ModelActor).modelComponent != null)
                isLoaded[i] = (this.modelActor_[i] as ModelActor).modelComponent.loaded;
            if(isLoaded[i]){
                cnt++;
                (this.modelActor_[i] as ModelActor).modelComponent.mesh.castShadow = true;
                (this.modelActor_[i] as ModelActor).modelComponent.mesh.receiveShadow = true;
            } 
        }

        if(cnt == this.MODEL_LEN) return true;
        return false;
    }

    private addScene():boolean{
        let b:boolean[] = new Array<boolean>(this.MODEL_LEN);
        let cnt:number = 0;
        for(let i=0; i<this.MODEL_LEN; i++){
            b[i] = (this.modelActor_[i] as ModelActor).addScene(this.scene_);
            if(b[i]) cnt++;
        }


        if(cnt == this.MODEL_LEN) return true;
        else                      return false;
    }

    public sceneLoader(_input:string):Scene{
        if(_input === "RESULT"){
            return new ResultScene(this.renderer_);
        }
        return null;
    }

    public inputKeyDownHandler(_keycord:string|number){
        console.log("input key down: " + _keycord);
        this.cameraActor_.inputKeyDownHandler(_keycord);
    }

    public inputKeyUpHandler(_keycord:string|number){
        console.log("input key up: " + _keycord);
        this.cameraActor_.inputKeyUpHandler(_keycord);
    }

    protected reset():void{
        this.allRemove();
        this.bAdded_ = true;
        this.isLoaded_ = false;
    };

    private checkGUi():void{
        if(this.gui_.model_1_ != this.bCurDrawState_[0]){
            this.bCurDrawState_[0] = this.gui_.model_1_;
            // (this.modelActor_[0] as ModelActor).visible();
            (this.modelActor_[0] as ModelActor).modelComponent.visible = this.bCurDrawState_[0];
        }
        if(this.gui_.model_2_ != this.bCurDrawState_[1]){
            this.bCurDrawState_[1] = this.gui_.model_2_;
            (this.modelActor_[1] as ModelActor).modelComponent.visible = this.bCurDrawState_[1];
        }
        if(this.gui_.model_3_ != this.bCurDrawState_[2]){
            this.bCurDrawState_[2] = this.gui_.model_3_;
            (this.modelActor_[2] as ModelActor).modelComponent.visible = this.bCurDrawState_[2];
        }
        if(this.gui_.model_4_ != this.bCurDrawState_[3]){
            this.bCurDrawState_[3] = this.gui_.model_4_;
            (this.modelActor_[3] as ModelActor).modelComponent.visible = this.bCurDrawState_[3];
        }
        if(this.gui_.model_5_ != this.bCurDrawState_[4]){
            this.bCurDrawState_[4] = this.gui_.model_5_;
            (this.modelActor_[4] as ModelActor).modelComponent.visible = this.bCurDrawState_[4];
        }
        if(this.gui_.model_6_ != this.bCurDrawState_[5]){
            this.bCurDrawState_[5] = this.gui_.model_6_;
            (this.modelActor_[5] as ModelActor).modelComponent.visible = this.bCurDrawState_[5];
        }
        if(this.gui_.model_7_ != this.bCurDrawState_[6]){
            this.bCurDrawState_[6] = this.gui_.model_7_;
            (this.modelActor_[6] as ModelActor).modelComponent.visible = this.bCurDrawState_[6];
        }
        if(this.gui_.model_8_ != this.bCurDrawState_[7]){
            this.bCurDrawState_[7] = this.gui_.model_8_;
            (this.modelActor_[7] as ModelActor).modelComponent.visible = this.bCurDrawState_[7];
        }
        if(this.gui_.model_9_ != this.bCurDrawState_[8]){
            this.bCurDrawState_[8] = this.gui_.model_9_;
            (this.modelActor_[8] as ModelActor).modelComponent.visible = this.bCurDrawState_[8];
        }
        if(this.gui_.model_10_ != this.bCurDrawState_[9]){
            this.bCurDrawState_[9] = this.gui_.model_10_;
            (this.modelActor_[9] as ModelActor).modelComponent.visible = this.bCurDrawState_[9];
        }
        if(this.gui_.model_11_ != this.bCurDrawState_[10]){
            this.bCurDrawState_[10] = this.gui_.model_11_;
            (this.modelActor_[10] as ModelActor).modelComponent.visible = this.bCurDrawState_[10];
        }
        if(this.gui_.model_12_ != this.bCurDrawState_[11]){
            this.bCurDrawState_[11] = this.gui_.model_12_;
            (this.modelActor_[11] as ModelActor).modelComponent.visible = this.bCurDrawState_[11];
        }
    }
}