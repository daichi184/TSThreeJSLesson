import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Scene } from '../core/scene';
import { Actor } from '../core/actor';
import { VideoActor } from "../core/videoActor";
import { MainScene } from './mainScene';
import { Mesh } from 'three';
import { PlaneGeometry } from "three";
import { Game } from '../game';

export class TitleScene extends Scene{
    
    private camera_: THREE.PerspectiveCamera;

    private videoActor_:VideoActor;
    private orbitControls_: OrbitControls;

    public constructor(_renderer: THREE.WebGLRenderer){
        super(_renderer);  

        // シーンを作成
        this.scene_ = new THREE.Scene();
        this.videoActor_ = new VideoActor(this.scene_, 'video');
        
        //-----------------------------------------------------------------------
        //カメラを設定
        //-----------------------------------------------------------------------
        this.camera_ = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera_.position.set(0, 0, 10);
        this.camera_.lookAt(this.scene_.position);
    }

    public setup():void{
        console.log("TitleScene setup");

        this.reset();

        this.videoActor_.addScene(this.scene_);
        this.videoActor_.play();

        this.orbitControls_ = new OrbitControls(this.camera_, this.renderer_.domElement);
    }

    public createPlaneMesh(_geom:THREE.PlaneGeometry):THREE.Mesh{
        let material:THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        let mesh = new THREE.Mesh(_geom, material);
        return mesh;
    }

    public update():void{
        console.log("TitleScene update");
        this.orbitControls_.update();
        this.renderer_.render(this.scene_, this.camera_);
    }

    public sceneLoader(_input:string):Scene{
        if(_input === "MAIN"){
            this.reset();
            return new MainScene(this.renderer_);
        }
        return null;
    }

    public inputKeyDownHandler(_keycode:string){
        if(_keycode === 'a')
            this.videoActor_.play();
        else if(_keycode === 'z')
            this.videoActor_.pause();
    }

    public  inputKeyUpHandler(_keycode:string){
        
    }

    protected reset():void{
        this.videoActor_.pause();
        this.videoActor_.currentTime = 0;
        this.allRemove();
    };
}
