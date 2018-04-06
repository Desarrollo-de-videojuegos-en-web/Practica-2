var clientPos = {
	0:{x:120,y:90},
	1:{x:90,y:185},
	2:{x:60,y:281},
	3:{x:30,y:377}	
};


var Client = function(sprite, pos, vx){
	this.setup(sprite, {x:clientPos[pos].x, y:clientPos[pos].y, vx:vx});
	
	this.step = function(dt){
		this.x += this.vx*dt;
		var collision = this.board.collide(this,OBJECT_BEER);
		if(collision) {
			GameManager.alertServedClient();
			GameManager.alertBeer();
			GameManager.checkGameState();
			this.board.remove(this);
			collision.hit(0);
			this.board.add(Object.create(collision, {
				sprite:{
					writable:true, configurable:true, value:'Glass'
				},
				vx:{
					writable:true, configurable:true, value: -this.vx
				},
				type:{
					writable:true, configurable:true, value: OBJECT_GLASS
				},
			}))
		}
		};
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

