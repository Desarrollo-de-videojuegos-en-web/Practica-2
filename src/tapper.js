var sprites = {
	Beer: {sx: 512,sy: 99,w: 23,h: 32,frames: 1},
	Glass: {sx: 512,sy: 131,w: 23,h: 32,frames: 1},
	NPC: {sx: 512,sy: 66,w: 33,h: 33,frames: 1},
	ParedIzda: {sx: 0,sy: 0,w: 512,h: 480,frames: 1},
	Player: {sx: 512,sy: 0,w: 56,h: 66,frames: 1},
	TapperGameplay: {sx: 0,sy: 480,w: 512,h: 480,frames: 1}
};

var playerVPos = [90,185,281,377];
var playerHPos = [325,357,389,421];

var clientVPos = [90,185,281,377];
var clientHPos = [50,90,80,70];

var beerVPos = [90,185,281,377];
var beerHPos = [50,90,80,70];

var BackSprite = function(){
	this.setup('ParedIzda',{x:0,y:0});
	this.setup('TapperGameplay', {x:0,y:0});
	this.draw(Game.ctx);
	this.step = function(dt){
	};
};

BackSprite.prototype = new Sprite();

var Player = function(){
	this.setup('Player', {x:playerHPos[0],y:playerVPos[0]});
	this.position = 0;
	this.draw(Game.ctx);

	this.step = function(dt){
		this.setPosition(this);
		this.checkFire(this);
		
	};
};

Player.prototype = new Sprite();

Player.prototype.checkFire = function(that){
	if(Game.keys['fire']){
		Game.keys['fire'] = false;
		//Game.boards[3].add(new Beer(this.x-25, this.y, 2));
		//var newBeer = Object.assign({},beerToClone);
		//newBeer.x=500;
		//newBeer.y=500;
		setTimeout(function(){
			var newBeer = new Beer(that.x-25,that.y,50);
			that.board.add(newBeer);
		},100);
	}
};
Player.prototype.setPosition = function(that){
	if(Game.keys['up']){
		Game.keys['up'] = false;
		setTimeout(function(){
			that.position-=1;
			if(that.position<0) that.position=3;
				that.x = playerHPos[that.position]; 
				that.y = playerVPos[that.position];
		},100);
	}
	if(Game.keys['down']){
		Game.keys['down'] = false;
		setTimeout(function(){
			that.position = (that.position + 1)%4;
			that.x = playerHPos[that.position]; 
			that.y = playerVPos[that.position];
		},100);
	}
};

var Beer = function(x, y, vx){
	this.setup('Beer', {x:x,y:y,vx:vx});
	this.position=vPos.indexOf(y);
	console.log(this.position);
	this.draw(Game.ctx);

	this.step = function(dt){
		if(this.x-100>0) { this.x += -7; 
		}else{
			this.board.remove(this);
		}
	};

};

Beer.prototype = new Sprite();

var Client = function(pos,vel){
	this.setup('NPC', {x:clientHPos[pos],y:clientVPos[pos],vx:vel});
	this.draw(Game.ctx);

	this.step = function(dt){
		
		if(300-this.x!=0 ) { 
			this.x += 1;
    	}else{
			this.board.remove(this);
		}
	};
};

Client.prototype = new Sprite();

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	boardPlayer.add(new Client(0,7));
	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);

};



window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

