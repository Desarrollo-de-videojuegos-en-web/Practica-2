/**
 * Valores usados para controlar los sprites del player
 */
const DELAY_CLEAN = 50
const DELAY_BROKE_GLASS = 20
const DELAY_BEER = 10
const DELAY_LOAD = 1

/**
 * Posiciones del jugador.
 */
var playerPos = {
	0:{x:325,y:90},
	1:{x:357,y:185},
	2:{x:389,y:281},
	3:{x:421,y:377}

};

/**
 * Clase que representa al jugador.
 */
var Player = function(){
	this.setup('Cleaning1', {x:playerPos[0].x,y:playerPos[0].y});
	this.pos = 0;
	this.clean = DELAY_CLEAN;

	this.step = function(dt){
		var collision = this.board.collide(this,OBJECT_GLASS);
		if(collision) {
			GameManager.alertBeerCollected();
			GameManager.checkGameState();
			this.board.remove(collision);
		}
		if(Game.keys['fire']){
			this.board.add(new Beer('Beer',this.pos, 150));
			Game.keys['fire'] = false;
		}
		if(Game.keys['up']){ 
			this.pos = (3 + this.pos ) % 4;
			Game.keys['up'] = false;
		}
		if(Game.keys['down']){
			this.pos = (this.pos + 1 ) % 4;
			Game.keys['down'] = false;
		}
		
		this.x = playerPos[this.pos].x;
    	this.y = playerPos[this.pos].y;
    	
    	/*Alterna dos sprites para dar la sensacion
    	de que el jugador esta limpiando la barra*/
    	--this.clean;
		if(this.clean==DELAY_CLEAN/2){
			this.sprite = 'Cleaning2'; 
		}else if(this.clean==0){
			this.clean = DELAY_CLEAN;
			this.sprite = 'Cleaning1';
		}
	};

};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;
