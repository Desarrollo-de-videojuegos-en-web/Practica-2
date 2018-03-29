var DeadZone = function(x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;

	this.step = function(dt){
		this.checkClientHit();
		this.checkBeerHit();
	};
};

DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.checkClientHit = function(){
	var collision = this.board.collide(this,OBJECT_CLIENT);
	
	if(collision) {
		GameManager.alertClientDeadZone();
		collision.hit(0); 
	}
};

DeadZone.prototype.checkBeerHit = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision){	
		GameManager.alertJarDeadZone();
		collision.hit(0);
	}
};

DeadZone.prototype.hit = function(damage){
	loseGame();
};

DeadZone.prototype.draw = function(ctx){
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "green";
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
};