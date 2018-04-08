/**
 * Posiciones de las deadzone.
 */
var deadZone = [
	{ x: 335, y: 90 },
    { x: 367, y: 185 },
    { x: 399, y: 281 },
    { x: 431, y: 377 },
    { x: 95, y: 90 },
    { x: 65, y: 185 },
    { x: 35, y: 281 },
    { x: 5, y: 377 }
];

/**
 * Clase que representa las deadzones usadas en el juego.
 * @param {pos} barra en la que crear la deadzone.
 */
var DeadZone = function(pos){
	this.x=deadZone[pos].x;
	this.y=deadZone[pos].y;
	this.w=10;
	this.h=65;

	this.step = function(dt){
		var client = this.board.collide(this,OBJECT_CLIENT);
		if(client) { // si un cliente llega al final de la barra perdemos
			client.hit();
			GameManager.loseGame();
		}

		var client = this.board.collide(this,OBJECT_SERVED_CLIENT);
		if(client) { /* pero si colisiona uno por la derecha (uno servido),
			avisamos a GameManager*/
			client.hit();
			GameManager.alertServedClient();
			GameManager.checkGameState();
		}
		var glass = this.board.collide(this,OBJECT_GLASS);
		/* si colisiona una jarra llena (derecha) solo perdemos una vida,
		si esta vacia además avisamos a GameManager para que actualice
		los contadores que gestionan el juego*/
		if(glass) { 
			glass.hit();
			GameManager.removeGlass();
			GameManager.alertGlassDeadZone();
			GameManager.checkGameState();
		}
		var beer = this.board.collide(this,OBJECT_BEER);
		if (beer){
			beer.hit();
			GameManager.alertBeerDeadZone();
			GameManager.checkGameState();
		}
	};
};

DeadZone.prototype = new Sprite();

DeadZone.prototype.type = OBJECT_DEADZONE;

/**
 * Pinta las deadzone en el canvas.
 * @param {ctx} elemento del canvas sobre el que dibujar.
 */
DeadZone.prototype.draw = function(ctx){
	/*var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "green";
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}*/
};