import * as THREE from 'three';

export class DirectionalLightComponent{
    private directionalLight_:THREE.DirectionalLight;

    private intensity_:number;

    constructor(_color:number = 0xffffff
        , _intensity = 1.0
        , _near = 2
        , _far = 200
        , _left = -50
        , _right = 50
        , _top = 50
        , _bottom = -50)
    {
        this.directionalLight_ = new THREE.DirectionalLight(_color, _intensity);
        this.setParamShadow(_near, _far, _left, _right, _top, _bottom);
        this.directionalLight_.castShadow = true;
    }

    public setParamShadow(_near:number
        , _far:number
        , _left:number
        , _right:number
        , _top:number
        , _bottom:number
        , _mapSize:number = 1024)
        :void
    {
        console.log("shadow parm: " + _near + ", " + _far + ", " + _left + ",  " + _right + ", " + _top + ", " + _bottom + ", " + _mapSize);
        this.directionalLight_.shadow.camera.near = _near;
        this.directionalLight_.shadow.camera.far = _far;
        this.directionalLight_.shadow.camera.left = _left;
        this.directionalLight_.shadow.camera.right = _right;
        this.directionalLight_.shadow.camera.top = _top;
        this.directionalLight_.shadow.camera.bottom = _bottom;

        this.directionalLight_.shadow.mapSize.height = _mapSize;
        this.directionalLight_.shadow.mapSize.width = _mapSize;

    }

    get intensity():number{ return this.intensity_; }
    set intensity(_intensity:number){ 
        this.intensity_ = _intensity; 
        this.directionalLight_.intensity = this.intensity_;
    }

    get castShadow():boolean{ return this.directionalLight.castShadow; }
    set castShadow(_b:boolean){ this.directionalLight.castShadow = _b;}

    get directionalLight(): THREE.DirectionalLight{
        return this.directionalLight_;
    }
}