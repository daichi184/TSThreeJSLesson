import { Actor } from './actor';
import * as THREE from 'three';
import { DirectionalLightComponent } from './compornents/directionalLightComponent';

export class DirectionalLightActor extends Actor{
    private dirComponent_: DirectionalLightComponent;
    public directionalLight_: THREE.DirectionalLight;

    constructor(_scene:THREE.Scene
        , _position: THREE.Vector3
        , _rotation: THREE.Vector3
        , _scale: THREE.Vector3
        , _color:number = 0xffffff
        , _intensity = 1.0
        , _near = 2
        , _far = 200
        , _left = -50
        , _right = 50
        , _top = 50
        , _bottom = -50)
    {
        super(_scene, _position, _rotation, _scale);

        this.dirComponent_ = new DirectionalLightComponent(
            _color, _intensity, _near, _far, _left, _right, _top, _bottom
        );

        this.position = _position;
        this.rotation = _rotation;
        this.scale = _scale;

        _scene.add(this.dirComponent_.directionalLight);

    }

    public update():void{

    }

    protected move():void{

    }

    public addScene(_scene: THREE.Scene):boolean{
        if(this.dirComponent_.directionalLight == null) return false;
        _scene.add(this.dirComponent_.directionalLight);
        return true;
    }

    get position():THREE.Vector3{ return this.position_; }
    set position(_position: THREE.Vector3){ 
        this.position_ = _position; 
        let dirLight:THREE.DirectionalLight = this.dirComponent_.directionalLight;
        dirLight.position.set(this.position_.x, this.position_.y, this.position_.z);
    }

    get rotation():THREE.Vector3{ return this.rotation_; }
    set rotation(_rotation: THREE.Vector3){ 
        this.rotation_ = _rotation;
        let dirLight:THREE.DirectionalLight = this.dirComponent_.directionalLight;
        dirLight.rotation.set(this.rotation_.x, this.rotation_.y, this.rotation_.z);
     }

    get scale(): THREE.Vector3{ return this.scale_; }
    set scale(_scale: THREE.Vector3){
        this.scale_ = _scale;
    }

    get dirLightComponent():DirectionalLightComponent{
        if(this.dirComponent_ == null) return null;
        return this.dirComponent_;
    }

    get castShadow():boolean{ return this.dirComponent_.castShadow; }
    set castShadow(_b:boolean){ this.dirComponent_.castShadow = _b;}

}