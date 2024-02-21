import * as THREE from 'three';
import { Singleton } from './core/singleton';
import { Scene } from './core/scene';
import { MainScene } from './Scenes/mainScene';
import { TitleScene } from './Scenes/titleScene';
import { ResultScene } from './Scenes/resultScene';


export class Game extends Singleton<Game>{

    private scene_: Scene;
    
    private renderer_: THREE.WebGLRenderer;

    public constructor(){
        super();

        this.renderer_ = new THREE.WebGLRenderer();
        // レンダラーのサイズを設定
        this.renderer_.setSize(window.innerWidth, window.innerHeight);
        
        // canvasをbodyに追加
        document.body.appendChild(this.renderer_.domElement);

        this.scene_ = new TitleScene(this.renderer_);
        // this.scene_ = new MainScene(this.renderer_);
        
        document.addEventListener('keydown', event=>{
            console.log("keydown: " + event.key);
        
            this.inputKeyDownHandler(event.key);

            let str:string;
            if(event.key === '1')      str = "TITLE";
            else if(event.key === '2') str = "MAIN";
            else if(event.key === '3') str = "RESULT";
            
            this.changeScene(str);
        });

        document.addEventListener('keyup', event=>{
            console.log("keyup: " + event.key);
            this.inputKeyUpHandler(event.key);
        });
    }

    public setup(): void{
        console.log("Game setup");
        this.scene_.setup();
    }

    public update(): void{
        this.scene_.update();
    }
    
    private changeScene(_input: string): void{  
        let scene: Scene = this.scene_.sceneLoader(_input);
        if(scene != null){
            this.scene_ = scene;
            this.scene_.setup();
        }
    }

    private inputKeyDownHandler(_keycode: string|number){
        this.scene_.inputKeyDownHandler(_keycode);
    }

    private inputKeyUpHandler(_keycode: string|number){
        this.scene_.inputKeyUpHandler(_keycode);
    }

    public reset(): void{

    }

}