/**
 * Clase que representa las vidas del juego.
 */
 var Lifes = function(){
	this.step = function(dt){
		
	};
};

Lifes.prototype = new Sprite();
 
/**
 * Clase que representa las cervezas usadas en el juego.
 * @param {ctx} objeto del canvas sobre el que se pintan las vidas
 */
Lifes.prototype.draw = function(ctx){  
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "yellow";
		ctx.font="20px Georgia";
		ctx.fillText("Lifes: " + GameManager.lifes,10,40);
	}
};