import Stats from 'three/examples/jsm/libs/stats.module';
import { Game } from "./game";
import { GuiController } from './GuiController';

const enum Sequence{
	TITEL,
	MAINLOOP,
	RESULT
}

let seq:Sequence = Sequence.TITEL;

const game_ = Game.getInstance(Game);
const gui_ = GuiController.getInstance(GuiController);
// let stats_ = initStats();

function init(){

	game_.setup();

	update();
}

function update(){
	// stats_.update();
	game_.update();
	requestAnimationFrame(update);
}

init();

