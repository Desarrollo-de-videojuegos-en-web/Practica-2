var sprites = {
	Beer: {sx: 512,sy: 99,w: 23,h: 32,frames: 1},
	Glass: {sx: 512,sy: 131,w: 23,h: 32,frames: 1},
	NPC: {sx: 512,sy: 66,w: 33,h: 33,frames: 1},
	ParedIzda: {sx: 0,sy: 0,w: 512,h: 480,frames: 1},
	Player: {sx: 512,sy: 0,w: 56,h: 66,frames: 1},
	TapperGameplay: {sx: 0,sy: 480,w: 512,h: 480,frames: 1}
};

var positions = {
	325: 1,
	357: 2,
	389: 3,
	281: 4
};



var BackSprite = function(){
	this.setup('ParedIzda',{x:0,y:0});
	this.draw(Game.ctx);
};

BackSprite.prototype = new Sprite();

var Player = function(){
	this.setup('Player', {x:325,y:90});
	this.draw(Game.ctx);

	this.step = function(dt){
		var position = this.getPosition();
		this.setPosition(position);
		if(Game.keys['fire']){
			Game.keys['fire'] = false;
			console.log('fireeeee');
			//var newBeer = Object.assign({},beerToClone);
			//newBeer.x=500;
			//newBeer.y=500;
			var newBeer = new Beer(200,200,50);
			this.boardPlayer.add(newBeer);
		}
	};
};

Player.prototype = new Sprite();

Player.prototype.getPosition = function(){
	if(this.x==325 && this.y==90) return 1;
	else if(this.x==357 && this.y==185) return 2;
	else if(this.x==389 && this.y==281) return 3;
	else if(this.x==421 && this.y==377) return 4;
};

Player.prototype.setPosition = function(position){
	switch(position){
		case 1:
			if(Game.keys['up']){
				this.x=421; this.y=377;
			}else if(Game.keys['down']){
				this.x=357; this.y=185;
			}
			break;
		case 2:
			if(Game.keys['up']){
				this.x=325; this.y=90;
			}else if(Game.keys['down']){
				this.x=389; this.y=281;
			}
			break;
		case 3:
			if(Game.keys['up']){
				this.x=357; this.y=185;
			}else if(Game.keys['down']){
				this.x=421; this.y=377;
			}
			break;
		case 4:
			if(Game.keys['up']){
				this.x=389; this.y=281;
			}else if(Game.keys['down']){
				this.x=325; this.y=90;
			}
			break;
	}
};

var Beer = function(x, y, velocity){
	this.setup('Beer', {x:x,y:y});
	this.draw(Game.ctx);
};

Beer.prototype = new Sprite();

var Client = function(){
	this.setup('NPC', {x:225,y:90});
	this.draw(Game.ctx);
};

Client.prototype = new Sprite();

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	boardPlayer.add(new Beer(275,90,10));
	boardPlayer.add(new Client());
	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);
};



window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

