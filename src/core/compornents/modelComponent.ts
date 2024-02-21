import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelComponet{

    private mesh_: THREE.Group;
    private bLoaded_:boolean;

    public constructor(_url: string){
        this.bLoaded_ = false;
        const gltfLoader = new GLTFLoader();
        gltfLoader.load((_url), (data:GLTF) => {
            const obj:THREE.Group = data.scene;
            this.mesh_ = obj;
            
            for(let i=0; i<this.mesh_.children.length; i++){
                this.mesh_.children[i].castShadow = true;
                this.mesh_.children[i].receiveShadow = true;
            }

            this.bLoaded_ = true;
            console.log("Load Done");
        });
    }

    get mesh(): THREE.Group{ return this.mesh_; }

    get loaded():boolean{ return this.bLoaded_; }

    set castShadow(_b:boolean){ 
        for(let i=0; i<this.mesh_.children.length; i++){
            this.mesh_.children[i].castShadow = _b;
        }
    }
    
    set receiveShadow(_b:boolean){
        for(let i=0; i<this.mesh_.children.length; i++){
            this.mesh_.children[i].receiveShadow = _b;
        }
    }

    set visible(_b:boolean){　this.mesh_.visible = _b; }
}