var beerPos = {
	0:{x:300,y:90},
	1:{x:332,y:185},
	2:{x:364,y:281},
	3:{x:396,y:377}
};

var Beer = function(sprite, pos, vel){
	this.dalay;
	this.setup(sprite, {x:beerPos[pos].x,y:beerPos[pos].y,vx:vel});

	this.step = function(dt){
		this.x -= this.vx*dt;
		if(this.vx==0){
			--this.delay;
			console.log(this.delay);
			if(this.delay==0){
				this.board.remove(this);
			}
		}
	};

};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;
