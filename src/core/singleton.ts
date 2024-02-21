import { MainScene } from "../Scenes/mainScene";

export abstract class Singleton<T>{
    private static instance_: any = null;

    public static getInstance<T>(c: { new(): T; }): T{
        if(this.instance_ == null){
            this.instance_ = new c();
        }
        return this.instance_;
    }

    protected constructor(){}

}
