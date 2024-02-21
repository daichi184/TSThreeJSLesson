import * as THREE from 'three';
import { Texture } from 'three';

export class Particle extends THREE.Object3D{
    private life_:number;
    private max_life_:number;
    private position_:THREE.Vector3;
    private velocity_:THREE.Vector3;
    private acceleration_:THREE.Vector3;
    private damping_:number;
    private mass_:number;
    private gravity_:number;
    
    private sphereGeometry_:THREE.SphereGeometry;
    private sphereMaterial_:THREE.MeshStandardMaterial;
    private particle_: THREE.Mesh;

    private isDead_:boolean;

    private scene_:THREE.Scene;

    constructor(_life:number, _position:THREE.Vector3, _velocity:THREE.Vector3, _acceleration:THREE.Vector3, _damping:number){
        super();

        this.life_ = _life;
        this.max_life_ = _life;
        this.position_ = _position;
        this.velocity_ = _velocity;
        this.acceleration_ = _acceleration;
        this.damping_ = _damping;

        this.mass_ = 0.5;// Math.floor(Math.random()*10) + 5;
        this.gravity_ = 9.8;

        this.sphereGeometry_ = new THREE.SphereGeometry(this.mass_, 20, 20);
        this.sphereMaterial_ = new THREE.MeshStandardMaterial({
            color:0x7777ff,
            transparent: true
        });
        this.particle_ = new THREE.Mesh(this.sphereGeometry_ , this.sphereMaterial_);

        this.isDead_ = false;

        this.add(this.particle_);
        console.log("particle constructor");
    }   

    public update():void{
        console.log("particle update");
        // this.velocity_ = this.velocity_.multiply(this.acceleration_);
        console.log("veleocity 1: " + this.velocity_.x + ", " +  this.velocity_.y + ", " + this.velocity_.z);

        this.velocity_ = this.velocity_.multiplyScalar(this.damping_);
        console.log("veleocity 2: " + this.velocity_.x + ", " +  this.velocity_.y + ", " + this.velocity_.z);

        this.position_ = this.position_.add(this.velocity_);
        console.log("position_ : " + this.position_.x + ", " +  this.position_.y + ", " + this.position_.z);

        this.particle_.position.set(this.position_.x, this.position_.y, this.position_.z);
        console.log("position_ !!!!!!!!!!!!!!");

        if(this.life_ > 0) this.life_ = this.life_ -1;
        else this.life_ = 0;
        console.log("life: " + this.life_);
        if(this.life_ == 0) {
            if(this.sphereMaterial_.opacity > 0)
                this.sphereMaterial_.opacity -= 0.1;
            else
                this.isDead_ = true;
        }

        if(this.isDead_){
            this.particle_.visible = false;
        }
    }

    get isDead():boolean{ return this.isDead_; }
}