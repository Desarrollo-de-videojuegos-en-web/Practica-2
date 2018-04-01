var playerPos = {
	0:{x:325,y:90},
	1:{x:357,y:185},
	2:{x:389,y:281},
	3:{x:421,y:377}

};
var Player = function(){
	this.setup('Player', {x:playerPos[0].x,y:playerPos[0].y});
	this.pos = 0;
	this.draw(Game.ctx);

	this.step = function(dt){
		if(Game.keys['fire']){
			this.board.add(new Beer('Beer',this.pos, this.x, this.y, 50));
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
		var collision = this.board.collide(this,OBJECT_BEER);
		if(collision) {
			GameManager.alertBeerCollected();
			GameManager.checkGameState();
			this.board.remove(collision);
		}

		this.x = playerPos[this.pos].x;
    	this.y = playerPos[this.pos].y;
	};

};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;