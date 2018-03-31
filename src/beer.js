var beerPos = {
	0:{x:325, y:90},
	1:{x:357, y:185},
	2:{x:389, y:281},
	3:{x:421, y:377}
};



var Beer = function(sprite, pos, x, y, vel){
	if(sprite.localeCompare('Glass')==0){
		this.setup(sprite, {x:x,y:y,vx:vel});
	}else{
		this.setup(sprite, {x:beerPos[pos].x-50,y:beerPos[pos].y,vx:vel});
	}
	this.pos=pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		this.x -= this.vx;
		//this.checkClientHit();
	};
};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

Beer.prototype.hit = function(damage){
	this.board.remove(this);
};

Beer.prototype.clone = function(){
	var beer = this;
    
    beer.sprite = 'Glass';
    beer.vx=-1;

    return beer;
};