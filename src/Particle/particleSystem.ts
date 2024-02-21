import * as THREE from 'three';
import { MinEquation, Object3D } from 'three';
import { Particle } from './particle';

export class ParticleSystem extends Object3D{
    private particles_:Particle[];
    private readonly LEN = 20;

    constructor (){
        super();
        this.particles_ = new Array<Particle>();

        let life:number = this.getRandom(10, 30);
        let pos: THREE.Vector3;
        let vel: THREE.Vector3;
        let acc = new THREE.Vector3(2.0, 2.0, 2.0);
        let damping:number = 0.4;

        for(let i=0; i<this.LEN; i++){
            pos = new THREE.Vector3(this.getRandom(-1.5, 1.5), this.getRandom(-1.5, 1.5), this.getRandom(-1.5, 1.5));
            vel = new THREE.Vector3(this.getRandom(-1.5, 1.5), this.getRandom(-1.5, 1.5), this.getRandom(-1.5, 1.5));
            this.addPartice(life, pos, vel, acc, damping);
        }
    }

    public update(): void{
        this.particles_.forEach(element => {
            element.update();
        });
    }

    private addPartice(
        _life:number
        , _position:THREE.Vector3
        , _velocity:THREE.Vector3
        , _acceleration:THREE.Vector3
        , _damping:number)
        :void
    {
        let p = new Particle(_life, _position, _velocity, _acceleration, _damping);
        this.particles_.push(p);
        this.add(p);
    }

    private getRandom(_min:number, _max:number):number{
        return Math.random() * (_max - _min) + _min;
    }

}