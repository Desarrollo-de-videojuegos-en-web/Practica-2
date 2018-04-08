/**
 * Posiciones en las que aparecen las cervezas cuando son lanzadas por el jugador
 */
var beerPos = {
	0:{x:300,y:90},
	1:{x:332,y:185},
	2:{x:364,y:281},
	3:{x:396,y:377}
};

/**
 * Clase que representa las cervezas usadas en el juego.
 * @param {sprite} spite de la cerveza
 * @param {pos} barra en la que crear la cerveza
 * @param {vel} velocidad de la cerveza
 */

var Beer = function(sprite, pos, vel){
	this.setup(sprite, {x:beerPos[pos].x,y:beerPos[pos].y,vx:vel});

	this.step = function(dt){
		this.x -= this.vx*dt;
	};

};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;
