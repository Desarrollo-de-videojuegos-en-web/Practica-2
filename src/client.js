var clientPos = {
	0:{x:120, y:90},
	1:{x:90, y:185},
	2:{x:60, y:281},
	3:{x:30, y:377}
};

var Client = function(pos,vx){
	this.setup('NPC', {x:clientPos[pos]+50,y:clientPos[pos],vx:vx});
	this.pos = pos;
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

Client.prototype.step = function(dt){
	this.x += this.vx*dt;
	this.checkBeerHit();
};

Client.prototype.checkBeerHit = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision) {
		GameManager.alertServedClient();
		GameManager.alertBeer();
		GameManager.checkGameState();
		this.hit(0);
		console.log(newBeer);
		this.board.add(newBeer);
		collision.hit(0);
	}
};

Client.prototype.hit = function(damage){
	this.board.remove(this);
};