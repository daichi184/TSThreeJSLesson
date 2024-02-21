import * as THREE from 'three';

export class CameraComponent{
    private camera_: THREE.PerspectiveCamera;

    public constructor(_fov:number = 45
        , _aspect:number = window.innerWidth/window.innerHeight
        , _near:number = 1
        , _far:number = 10000){
        this.camera_ = new THREE.PerspectiveCamera(_fov, _aspect, _near, _far);
    }

    get camera():THREE.PerspectiveCamera{
        return this.camera_;
    }
    
}