import { Actor } from './actor';
import * as THREE from 'three';
import { CameraComponent } from './compornents/cameraCompornent';
import { PointLookControllerComponent } from './compornents/pointLookControllerComponent';

export class CameraActor extends Actor{
    private cameraComponent_: CameraComponent;
    private ptLookCtrlComponent_:PointLookControllerComponent;

    constructor(_scene:THREE.Scene
        , _render:THREE.WebGLRenderer
        , _position: THREE.Vector3
        , _rotation: THREE.Vector3
        , _scale: THREE.Vector3
        , _fov:number = 45
        , _aspect:number = window.innerWidth / window.innerHeight
        , _near:number = 1
        , _far:number = 10000)
    {
        super(_scene, _position, _rotation, _scale);
        this.cameraComponent_ = new CameraComponent();
        this.ptLookCtrlComponent_ = new PointLookControllerComponent(this.cameraComponent.camera, _render.domElement);
        this.ptLookCtrlComponent_.speed = 15;

        document.addEventListener('click', ()=>{
            this.ptLookCtrlComponent_.lock();
        });

        this.position = _position;
        this.rotation = _rotation;
        this.scale = _scale;
    }

    public update():void{
        this.ptLookCtrlComponent_.update();
        this.position = this.ptLookCtrlComponent_.position;

        console.log("camera position: " + this.position.x + ", " + this.position.y + ", " + this.position.z);
    }

    protected move():void{

    }

    get position():THREE.Vector3{ return this.position_; }
    set position(_position: THREE.Vector3){ 
        this.position_ = _position; 
        // this.camera_.position.set(this.position_.x, this.position_.y, this.position_.z);
        this.cameraComponent_.camera.position.set(this.position_.x, this.position_.y, this.position_.z);
    }

    get rotation():THREE.Vector3{ return this.rotation_; }
    set rotation(_rotation: THREE.Vector3){ 
        this.rotation_ = _rotation;
        // this.camera_.rotation.set(this.rotation_.x, this.rotation_.y, this.rotation_.z);
        this.cameraComponent_.camera.rotation.set(this.rotation_.x, this.rotation_.y, this.rotation_.z);
     }

     get scale(): THREE.Vector3{ return this.scale_; }
     set scale(_scale: THREE.Vector3){
        this.scale_ = _scale;
     }

     get cameraComponent():CameraComponent{
         if(this.cameraComponent_ == null) return null;
         return this.cameraComponent_;
     }

     public inputKeyDownHandler(_keycord:string|number){
        this.ptLookCtrlComponent_.inputKeyDownHandler(_keycord);
     }

     public inputKeyUpHandler(_keycord:string|number){
        this.ptLookCtrlComponent_.inputKeyUpHandler(_keycord);
     }
}