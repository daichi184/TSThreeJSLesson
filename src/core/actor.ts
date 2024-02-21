import { Mode } from 'fs';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export abstract class Actor{

    protected scene_ : THREE.Scene;
    protected position_ : THREE.Vector3;
    protected rotation_ : THREE.Vector3;
    protected scale_ : THREE.Vector3;

    protected constructor(_scene:THREE.Scene,  _position: THREE.Vector3, _rotation: THREE.Vector3, _scale: THREE.Vector3)
    {
        this.scene_ = _scene;
        this.position_ = _position;
        this.rotation_ = _rotation;
        this.scale_ = _scale;
    }    

    public abstract update(): void;
    protected abstract move():void;


    abstract get position():THREE.Vector3;
    abstract set position(_position:THREE.Vector3);

    abstract get rotation():THREE.Vector3;
    abstract set rotation(_rotation:THREE.Vector3);

    abstract get scale():THREE.Vector3;
    abstract set scale(_scale:THREE.Vector3);


}