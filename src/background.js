/**
 * Clase que representa el fondo del juego
 */
 var BackSprite = function(){
	this.setup('ParedIzda',{x:0,y:0});
	this.setup('TapperGameplay', {x:0,y:0});
	this.step = function(dt){
	};
};

BackSprite.prototype = new Sprite();