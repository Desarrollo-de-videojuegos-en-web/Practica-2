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
	this.setup('ParedIzda',{x:100,y:100});

};

BackSprite.prototype = new Sprite();

var Player = function(){
	this.setup('Player', {x:325,y:90});

	this.step = function(){
		var position = this.getPosition();
		this.setPosition(position);
		this.checkBeer();
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

Player.prototype.checkBeer = function(){
	if(Game.keys['fire']){
		this.boardPlayer.add(new Beer(this.x+20, this.y));
	}
};

var Beer = function(x, y, velocity){
	this.setup('Beer', {x:50,y:50});

};

Beer.prototype = new Sprite();

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	boardPlayer.add(new Beer());
	Game.setBoard(0,board);
	Game.setBoard(1,boardPlayer);
};



window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

