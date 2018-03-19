var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8,
    OBJECT_GLASS = 16;


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
	this.pos = 0;
	this.draw(Game.ctx);

	this.step = function(dt){
		this.checkUp(this);
		this.checkDown(this);
		this.checkFire(this);		
	};
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.checkFire = function(that){
	if(Game.keys['fire']){
		Game.keys['fire'] = false;
		setTimeout(function(){
			var newBeer = new Beer('Beer',that.pos, that.x, that.y, 1);
			that.board.add(newBeer);
		},100);
	}
};

Player.prototype.checkUp = function(that){
	if(Game.keys['up']){
		Game.keys['up'] = false;
		setTimeout(function(){
			that.pos-=1;
			if(that.pos<0) that.pos=3;
				that.x = playerHPos[that.pos]; 
				that.y = playerVPos[that.pos];
		},100);
	}
};

Player.prototype.checkDown = function(that){
	if(Game.keys['down']){
		Game.keys['down'] = false;
		setTimeout(function(){
			that.pos = (that.pos + 1)%4;
			that.x = playerHPos[that.pos]; 
			that.y = playerVPos[that.pos];
		},100);
	}
};



var Beer = function(sprite, pos, x, y, vel)
{	if(sprite.localeCompare('Glass')==0){
		console.log('Glass');
		this.setup(sprite, {x:x,y:y,vx:vel});
	}else{
		console.log('Beer', sprite);
		this.setup(sprite, {x:beerHPos[pos]-50,y:beerVPos[pos],vx:vel});
	}
	this.pos=pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		if(this.x-leftLimits[this.pos]>0) this.x -= this.vx;
		else loseGame();
		if(this.x>=rigthLimits[this.pos]) loseGame();
		this.checkPlayerHit();
		this.checkClientHit();
		this.checkDeadzoneHit();
	};

};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

Beer.prototype.checkPlayerHit = function(){
	var collision = this.board.collide(this,OBJECT_PLAYER);
	if(collision) {
		this.hit(0);
	}
};

Beer.prototype.checkClientHit = function(){
	var collision = this.board.collide(this,OBJECT_CLIENT);
	if(collision) {
		this.hit(0);
		this.board.add(new Beer('Glass', this.pos, this.x, this.y, -1));
	}
};

Beer.prototype.checkDeadzoneHit = function(){
	var collision = this.board.collide(this,OBJECT_DEADZONE);
	if(collision) {
		console.log('hi');
		this.hit(0);
	}
};

Beer.prototype.hit = function(damage){
	this.board.remove(this);
};

var Client = function(pos,vel){
	this.setup('NPC', {x:clientHPos[pos]+50,y:clientVPos[pos],vx:vel});
	this.pos = pos;
	this.draw(Game.ctx);

	this.step = function(dt){
		
		if(playerHPos[this.pos]-33-this.x!=0 ) this.x += 1;
		this.checkBeerHit();
		this.checkDeadzoneHit();
	};
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

Client.prototype.checkBeerHit = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision) {
		this.hit(0);
	}
};

Client.prototype.checkDeadzoneHit = function(){
	var collision = this.board.collide(this,OBJECT_DEADZONE);
	if(collision) {
		this.hit(0);
	}
};

Client.prototype.hit = function(damage){
	this.board.remove(this);
};


var DeadZone = function(x,y,w,h){
	//this.setup('', {x:100,y:100,w:10,h:70});
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;

	this.step = function(dt){
		this.checkClientHit();
		this.checkBeerHit();
		this.checkGlassHit();
	};
};

DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.checkClientHit = function(){
	var collision = this.board.collide(this,OBJECT_CLIENT);
	if(collision) collision.hit(0); 
};

DeadZone.prototype.checkGlassHit = function(){
	var collision = this.board.collide(this,OBJECT_GLASS);
	if(collision) collision.hit(0);
};

DeadZone.prototype.checkBeerHit = function(){
	var collision = this.board.collide(this,OBJECT_BEER);
	if(collision) collision.hit(0);
};

DeadZone.prototype.hit = function(damage){
	loseGame();
};

DeadZone.prototype.draw = function(ctx){
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "green";
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
};


var Spawner = function(boardPlayer, clients, type, frequency, delay){
	this.proto = new Client();
	this.board = boardPlayer;
	this.clients = clients;
	this.type = type;
	this.frequency = frequency;
	this.delay = delay;
	this.free = true;
};

Spawner.prototype.run = function(dt) {
	this.prototype(this);
};

Spawner.prototype.prototype = function(that){
	for(i=0; i<that.clients; i++){
		that.delay+=Math.floor((Math.random() * 2000) + 0);
		setTimeout(function(){
			var bar = Math.floor((Math.random() * 4) + 0);
			that.board.add(that.clone(bar, that.proto));
		}, that.delay+ that.frequency);
	}
};

Spawner.prototype.clone = function (bar, proto) {
        var client = new Client(bar,5);
        client.x = clientHPos[bar];
        client.y = clientVPos[bar];
        client.sprite = proto.sprite;
        return client;
};

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	var spawn = new Spawner(boardPlayer, 8,0,1000,500);
	console.log(boardPlayer);
	spawn.run();
	// estos 8 no valen
	/*boardPlayer.add(new DeadZone(150, 90, 10, 70));
	boardPlayer.add(new DeadZone(120, 185, 10, 70));
	boardPlayer.add(new DeadZone(90, 281, 10, 70));
	boardPlayer.add(new DeadZone(60, 377, 10, 70));*/

	boardPlayer.add(new DeadZone(305, 90, 10, 70));
	boardPlayer.add(new DeadZone(337, 185, 10, 70));
	boardPlayer.add(new DeadZone(369, 281, 10, 70));
	boardPlayer.add(new DeadZone(401, 377, 10, 70));


	boardPlayer.add(new DeadZone(345, 90, 10, 70));
	boardPlayer.add(new DeadZone(377, 185, 10, 70));
	boardPlayer.add(new DeadZone(409, 281, 10, 70));
	boardPlayer.add(new DeadZone(441, 377, 10, 70));
	boardPlayer.add(new DeadZone(95, 90, 10, 70));
	boardPlayer.add(new DeadZone(65, 185, 10, 70));
	boardPlayer.add(new DeadZone(35, 281, 10, 70));
	boardPlayer.add(new DeadZone(5, 377, 10, 70));

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

