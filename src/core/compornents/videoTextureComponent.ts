import * as THREE from 'three';

export class VideoTextureComponent{

    private video_:HTMLVideoElement;
    private texture_:THREE.VideoTexture;

    public constructor(_id:string){
        this.video_ = <HTMLVideoElement>document.getElementById(_id);
        this.texture_ = new THREE.VideoTexture(this.video_);
        this.texture_.minFilter = THREE.LinearFilter;
        this.texture_.magFilter = THREE.LinearFilter;
        this.texture_.generateMipmaps = false;
    }

    get video():HTMLVideoElement{ return this.video_; }
    get texture():THREE.VideoTexture{ return this.texture_; }

    public play():void{ this.video.play(); }
    public pause():void{ this.video.pause(); }

    get currentTime():number{ return this.video.currentTime; }
    set currentTime(_curTime:number){ this.video.currentTime = _curTime; }

    public createBoxMesh(_geom:THREE.BoxGeometry):THREE.Mesh{
        let materials:any = [];
        materials.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        materials.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        materials.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        materials.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        materials.push(new THREE.MeshBasicMaterial({map: this.texture_}));
        materials.push(new THREE.MeshBasicMaterial({color: 0xff51ba}));

        // create a multimaterial
        let mesh = new THREE.Mesh(_geom, materials);

        return mesh;
    }

    public createPlaneMesh(_geom:THREE.PlaneGeometry):THREE.Mesh{
        let material:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: this.texture_});
        let mesh = new THREE.Mesh(_geom, material);
        return mesh;
    }

}
