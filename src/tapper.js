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
	this.setup('TapperGameplay', {x:0,y:0});
	this.draw(Game.ctx);

	this.step = function(dt){
		
	};
};

BackSprite.prototype = new Sprite();

var Player = function(){
	this.setup('Player', {x:325,y:90});
	this.draw(Game.ctx);

	this.step = function(dt){
		var position = this.getPosition();
		this.setPosition(this, position);
		if(Game.keys['fire']){
			Game.keys['fire'] = false;
			console.log('fireeeee');
			//Game.boards[3].add(new Beer(this.x-25, this.y, 2));
			//var newBeer = Object.assign({},beerToClone);
			//newBeer.x=500;
			//newBeer.y=500;
			var newBeer = new Beer(this.x-25,this.y,50);
			this.board.add(newBeer);
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

Player.prototype.setPosition = function(that, position){
	switch(position){
		case 1:
			if(Game.keys['up']){
				setTimeout(function(){
					that.x=421; that.y=377;
									console.log('uppp');
 
					//obj.click = false;
				}, 1000);
				
			}else if(Game.keys['down']){
				setTimeout(function(){
					this.x=357; this.y=185;
					//obj.click = false;
				}, 1000);
				
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
	this.setup('Beer', {x:x,y:y,vx:velocity});
	this.draw(Game.ctx);

	this.step = function(dt){
		
		console.log(this.x-100);
		//if(this.x-100 != 0) { this.x += -7; }
		if(this.x-100>0) { this.x += -7; }
	};

};

Beer.prototype = new Sprite();

var Client = function(){
	this.setup('NPC', {x:225,y:90,vx:7});
	this.draw(Game.ctx);

	this.step = function(dt){
		
		if(300-this.x!=0 ) { this.x += 1;
			console.log(this.x);
    	  //this.x = Game.width - this.w;
    	}
	};
};

Client.prototype = new Sprite();

var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	//boardPlayer.add(new Beer(275,90,20));
	boardPlayer.add(new Client());
	Game.setBoard(3,boardPlayer);
	Game.setBoard(2,board);

};



window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

