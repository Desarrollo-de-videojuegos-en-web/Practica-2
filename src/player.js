var Player = function(){
	this.setup('Player', {x:playerHPos[0],y:playerVPos[0]});
	this.pos = 0;
	this.draw(Game.ctx);

	this.step = function(dt){
		this.checkUp(this);
		this.checkDown(this);
		this.checkFire(this);	
		this.checkBeer();	
	};
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.checkFire = function(that){
	if(Game.keys['fire']){
		Game.keys['fire'] = false;
		var newBeer = new Beer('Beer',that.pos, that.x, that.y, 1);
		that.board.add(newBeer);
	}
};

Player.prototype.checkUp = function(that){
	if(Game.keys['up']){
		Game.keys['up'] = false;
		setTimeout(function(){
			that.pos-=1;
			if(that.pos<0) that.pos=3;
				that.x = playerHPos[that.pos]; 
				that.y = playerVPos[that.pos];
		},100);
	}
};

Player.prototype.checkDown = function(that){
	if(Game.keys['down']){
		Game.keys['down'] = false;
		setTimeout(function(){
			that.pos = (that.pos + 1)%4;
			that.x = playerHPos[that.pos]; 
			that.y = playerVPos[that.pos];
		},100);
	}
};

Player.prototype.checkBeer = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision) {
		GameManager.alertBeerCollected();
		GameManager.checkGameState();
		collision.hit(0);
	}
};