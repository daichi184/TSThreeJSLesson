import * as THREE from 'three';
import { Scene } from '../core/scene';
import { TitleScene } from './titleScene';

import { Actor } from '../core/actor';
import { DirectionalLightActor } from '../core/directionalLightActor';

import { Particle } from '../Particle/particle';
import { ParticleSystem } from '../Particle/particleSystem';

export class ResultScene extends Scene{
    
    private camera_: THREE.PerspectiveCamera;
    private dirLightActor_: DirectionalLightActor;

    // private particle: Particle;
    private ps_:ParticleSystem;

    public constructor(_renderer: THREE.WebGLRenderer){
        super(_renderer);  

        this.camera_ = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera_.position.set(0, 10, 50);

        // シーンを作成
        this.scene_ = new THREE.Scene();
    }

    public setup():void{
        console.log("ResultScene Setup");

        this.reset();

        this.dirLightActor_ = new DirectionalLightActor(
            this.scene_
            , new THREE.Vector3(-40, 60, 10)
            , new THREE.Vector3(1, 1, 1)
            , new THREE.Vector3(1, 1, 1));

        // this.particle = new Particle(
        //     20
        //     , new THREE.Vector3(0, 0, 0)
        //     , new THREE.Vector3(1.1, 1.2, 1.3)
        //     , new THREE.Vector3(2.0, 2.0, 2.0)
        //     , 0.4
        //     );

        // this.scene_.add(this.particle);
        
        this.ps_ = new ParticleSystem();
        this.scene_.add(this.ps_);
    }

    public update():void{
        // console.log("ResultScene Update");
        // this.particle.update();
        this.ps_.update();
        this.renderer_.render(this.scene_, this.camera_);
    }

    public sceneLoader(_input:string):Scene{
        if(_input === "TITLE"){
            return new TitleScene(this.renderer_);
        }
        return null;
    }

    public inputKeyDownHandler(_keycord:string){

    }

    public inputKeyUpHandler(_keycord:string){

    }

    protected reset():void{
        this.allRemove();
    };
}
