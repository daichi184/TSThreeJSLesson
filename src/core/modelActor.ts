import { Actor } from './actor';
import * as THREE from 'three';
import { ModelComponet } from './compornents/modelComponent';

export class ModelActor extends Actor{
    protected modelComponent_ : ModelComponet;

    constructor(_scene:THREE.Scene
        , _url: string
        , _position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
        , _rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
        , _scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1))
    {
        super(_scene, _position, _rotation, _scale);
        this.modelComponent_ = new ModelComponet(_url);
        this.transform(_position, _rotation, _scale);
    }

    public update(): void{
        this.move();
    }

    protected move():void {
        if(this.modelComponent_.mesh != null){
            this.modelComponent_.mesh.rotation.y += 0.005;
        }
    }

    public addScene(_scene: THREE.Scene):boolean {
        if(this.modelComponent_.mesh == null){ return false; }
        _scene.add(this.modelComponent_.mesh);
        return true;
    }

    get modelComponent():ModelComponet{
        if(this.modelComponent_ == null) return null;
        return this.modelComponent_;
    }

    get mesh():THREE.Group { 
        if(this.modelComponent_.mesh == null) return null;
        return this.modelComponent_.mesh; 
    };

    public transform(_position:THREE.Vector3, _rotation:THREE.Vector3, _scale:THREE.Vector3):void{
        if(this.modelComponent_.mesh == null) return;
        this.position = _position;
        this.rotation = _rotation;
        this.scale = _scale;
    }

    get position():THREE.Vector3{ return this.position_; }
    set position(_position: THREE.Vector3){ 
        this.position_ = _position; 
        this.modelComponent_.mesh.position.set(this.position_.x, this.position_.y, this.position_.z);
    }

    get rotation():THREE.Vector3{ return this.rotation_; }
    set rotation(_rotation: THREE.Vector3){ 
        this.rotation_ = _rotation;
        this.modelComponent_.mesh.rotation.set(this.rotation_.x, this.rotation_.y, this.rotation_.z);
     }

    get scale(): THREE.Vector3{ return this.scale_; }
    set scale(_scale: THREE.Vector3){ 
        this.scale_ = _scale; 
        this.modelComponent_.mesh.scale.set(this.scale_.x, this.scale_.y, this.scale_.z);
    }

    set castShadow(_b:boolean){
        if(this.modelComponent_.mesh == null) return;
        this.modelComponent_.castShadow = _b;
    }

    set receiveShadow(_b:boolean){
        if(this.modelComponent_.mesh == null) return;
        this.modelComponent_.receiveShadow = _b;
    }
}
