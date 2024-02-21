import { Actor } from './actor';
import * as THREE from 'three';
import { VideoTextureComponent } from "./compornents/videoTextureComponent";

export class VideoActor extends Actor{
    protected videoTextureComponent_ : VideoTextureComponent;

    private plane_:THREE.Mesh;

    constructor(_scene:THREE.Scene
        , _id:string
        ,  _position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
        , _rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
        , _scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1))
    {
        super(_scene, _position, _rotation, _scale);
        this.videoTextureComponent_ = new VideoTextureComponent(_id);

        this.plane_ = this.videoTextureComponent_.createPlaneMesh(new THREE.PlaneGeometry(16, 9, 4, 4));
        this.transform(_position, _rotation, _scale);
    }

    public update():void{
        
    }

    protected move():void{

    }

    public addScene(_scene:THREE.Scene):boolean{
        if(this.plane_ == null) return false;
        _scene.add(this.plane_);
        return true;
    }

    public play():void{ this.videoTextureComponent_.play() }
    public pause():void{ this.videoTextureComponent_.pause(); }

    get currentTime():number{ return this.videoTextureComponent_.currentTime; }
    set currentTime(_curTime:number){ this.videoTextureComponent_.currentTime = _curTime; }

    public transform(_position:THREE.Vector3, _rotation:THREE.Vector3, _scale:THREE.Vector3):void{
        this.position = _position;
        this.rotation = _rotation;
        this.scale = _scale;
    }

    get position():THREE.Vector3{ return this.position_; }
    set position(_position:THREE.Vector3){
        this.plane_.position.set(_position.x, _position.y, _position.z);
    }

    get rotation():THREE.Vector3{ return this.rotation_; }
    set rotation(_rotation:THREE.Vector3){
        this.plane_.rotation.set(_rotation.x, _rotation.y, _rotation.z);
    }

    get scale():THREE.Vector3{ return this.scale_; }
    set scale(_scale:THREE.Vector3){
        this.plane_.scale.set(_scale.x, _scale.y, _scale.z);
    }

}