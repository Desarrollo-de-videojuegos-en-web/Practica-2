var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4;


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
var clientHPos = [120,90,60,30];

var beerVPos = [90,185,281,377];
var beerHPos = [325,357,389,421];

var leftLimits = [120,90,60,30];
var rigthLimits = [325,357,389,421];

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
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.checkFire = function(that){
	if(Game.keys['fire']){
		Game.keys['fire'] = false;
		setTimeout(function(){
			var newBeer = new Beer('Beer',that.position, this.x, this.y, 1);
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

var Beer = function(sprite, pos, x, y, vel){
	if(sprite.localeCompare('Glass')==0){
		console.log('Glass');
		this.setup(sprite, {x:x,y:y,vx:vel});
	}else{
		console.log('Beer', sprite);
		this.setup(sprite, {x:beerHPos[pos]-25,y:beerVPos[pos],vx:vel});
	}
	this.position=pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		if(this.x-leftLimits[this.position]>0) { 
			this.x = this.x - this.vx;
		}
		var collision = this.board.collide(this,OBJECT_CLIENT);
		if(collision) {
			this.hit(0);
			this.board.add(new Beer('Glass', this.position, this.x, this.y, -1));
		}
		var collision = this.board.collide(this,OBJECT_PLAYER);
		if(collision) {
			this.hit(0);
		}
	};

};

Beer.prototype.hit = function(damage){
	this.board.remove(this);
};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

var Client = function(pos,vel){
	this.setup('NPC', {x:clientHPos[pos]-23,y:clientVPos[pos],vx:vel});
	this.position = pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		
		if(playerHPos[this.position]-33-this.x!=0 ) { 
			this.x += 1;
    	}else{
			loseGame();
		}
		var collision = this.board.collide(this,OBJECT_BEER);
		if(collision) {
			this.hit(0);
		}
	};
};

Client.prototype.hit = function(damage){
	this.board.remove(this);
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	boardPlayer.add(new Client(0,2));
	boardPlayer.add(new Client(1,2));
	boardPlayer.add(new Client(2,2));
	boardPlayer.add(new Client(3,2));
	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);

};

var loseGame = function() {
  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press fire to play again",
                                  playGame));
};


window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

