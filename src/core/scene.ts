import * as THREE from 'three';

export abstract class Scene{
    protected renderer_: THREE.WebGLRenderer;
    protected scene_: THREE.Scene;

    protected constructor(_renderer: THREE.WebGLRenderer){
        this.renderer_ = _renderer;
        this.renderer_.shadowMap.enabled = true;
        this.renderer_.outputEncoding = THREE.GammaEncoding; //画面を明るくする
    }

    public abstract setup(): void;
    public abstract update():void;
    protected abstract reset():void;
    
    public abstract sceneLoader(_input:string):Scene;

    public abstract inputKeyDownHandler(_keycord:string|number);
    public abstract inputKeyUpHandler(_keycord:string|number);

    protected allRemove() :void{
        console.log("All Remove");
        if(this.scene_ == null) return;

        while(this.scene_.children.length > 0){
            for(let i=0; i<this.scene_.children.length; i++){
                this.scene_.remove(this.scene_.children[i])
            }
        }
    }

    
}