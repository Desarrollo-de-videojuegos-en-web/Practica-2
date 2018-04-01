var beerPos = {
	0:{x:325,y:90},
	1:{x:357,y:185},
	2:{x:389,y:281},
	3:{x:421,y:377}
};

var Beer = function(sprite, pos, x, y, vel){
	this.setup(sprite, {x:beerPos[pos].x-50,y:beerPos[pos].y,vx:vel});

	this.step = function(dt){
		this.x -= this.vx*dt;
	};

};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;
