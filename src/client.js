var Client = function(pos,vel){
	this.setup('NPC', {x:clientHPos[pos]+50,y:clientVPos[pos],vx:vel});
	this.pos = pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		this.x += 1;
		this.checkBeerHit();
	};
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

Client.prototype.checkBeerHit = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision) {
		GameManager.alertServedClient();
		GameManager.alertBeer();
		GameManager.checkGameState();
		this.hit(0);
		collision.hit(0);
		this.board.add(new Beer('Glass', this.pos, collision.x, collision.y, -1));
	}
};

Client.prototype.hit = function(damage){
	this.board.remove(this);
};