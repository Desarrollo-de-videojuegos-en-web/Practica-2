var Beer = function(sprite, pos, x, y, vel){
	if(sprite.localeCompare('Glass')==0){
		console.log('Glass');
		this.setup(sprite, {x:x,y:y,vx:vel});
	}else{
		console.log('Beer', sprite);
		this.setup(sprite, {x:beerHPos[pos]-50,y:beerVPos[pos],vx:vel});
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
	var beer = new Beer();
    beer.x = this.x;
    beer.y = this.y;
    beer.sprite = 'Glass';
    beer.vx=-1;
    beer.pos=this.pos;
    return beer;
};