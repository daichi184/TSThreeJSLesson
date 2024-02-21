import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

export class PointLookControllerComponent{
    private ptLookCtrl_: PointerLockControls;
    private prevTime_: number;

    private moveForward_;
    private moveBack_;
    private moveLeft_;
    private moveRight_;
    private moveUP_;
    private moveDown_;

    private speed_;

    public constructor(_camera:THREE.Camera, _domElement: HTMLElement){
        this.prevTime_ = window.performance.now();
        this.ptLookCtrl_ = new PointerLockControls(_camera, _domElement);

        this.moveForward_ = false;
        this.moveBack_ = false;
        this.moveLeft_ = false;
        this.moveRight_ = false;
        this.moveUP_ = false;
        this.moveDown_ = false;

        this.speed_ = 60;
    }

    public update(){
        let v = this.getVelocity();
        this.ptLookCtrl_.getObject().translateX(v.x);
        this.ptLookCtrl_.getObject().translateZ(v.z);
        this.ptLookCtrl_.getObject().translateY(v.y);
    }

    private getVelocity():THREE.Vector3{
        let time:number =  window.performance.now();
        let delta = (time - this.prevTime_)/1000;

        let directionX = Number(this.moveLeft_) - Number(this.moveRight_);
        let directionY = Number(this.moveUP_) - Number(this.moveDown_);
        let directionZ = Number(this.moveForward_) - Number(this.moveBack_);

        let velocity: THREE.Vector3 = new THREE.Vector3();
        velocity.x -= directionX*this.speed_*delta;
        velocity.y -= directionY*this.speed_*delta;
        velocity.z -= directionZ*this.speed_*delta;
        
        this.prevTime_ = time;

        return velocity;
    }

    set speed(_speed:number){ this.speed_ = _speed; }
    get speed():number{ return this.speed_; }
    get position():THREE.Vector3{ return this.ptLookCtrl_.getObject().position; }

    public lock():void{
        this.ptLookCtrl_.lock();
    }

    public inputKeyDownHandler(_keycord:string|number){
        if(_keycord === 'a'){ this.moveLeft_ = true; }
        else if(_keycord === 'd') { this.moveRight_ = true; }
        else if(_keycord === 'w') { this.moveForward_ = true; }
        else if(_keycord === 's') { this.moveBack_ = true; }
        else if(_keycord === 'z') { this.moveUP_ = true; }
        else if(_keycord === 'x') { this.moveDown_ = true; }
    }

    public inputKeyUpHandler(_keycord:string|number){
        if(_keycord === 'a'){ this.moveLeft_ = false; }
        else if(_keycord === 'd') { this.moveRight_ = false; }
        else if(_keycord === 'w') { this.moveForward_ = false; }
        else if(_keycord === 's') { this.moveBack_ = false; }
        else if(_keycord === 'z') { this.moveUP_ = false; }
        else if(_keycord === 'x') { this.moveDown_ = false; }
    }
}