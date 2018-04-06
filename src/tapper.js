 var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8,
    OBJECT_GLASS = 16,
    OBJECT_TIP = 32,
    OBJECT_NULL = 64;

var sprites = {
	Beer: {sx: 512,sy: 99,w: 23,h: 32,frames: 1},
	Glass: {sx: 512,sy: 131,w: 23,h: 32,frames: 1},
	NPC: {sx: 512,sy: 66,w: 33,h: 33,frames: 1},
	ParedIzda: {sx: 0,sy: 0,w: 512,h: 480,frames: 1},
	Player: {sx: 512,sy: 0,w: 56,h: 66,frames: 1},
	TapperGameplay: {sx: 0,sy: 480,w: 512,h: 480,frames: 1}
};

var clients = {
	Normal1: {sx: 0,sy: 0,w: 134,h: 134,frames: 1},
	Relax1: {sx: 134,sy: 0,w: 134,h: 134,frames: 1},
	Angry1: {sx: 268,sy: 0,w: 134,h: 134,frames: 1},
	VeryAngry1: {sx: 402,sy: 0,w: 134,h: 134,frames: 1},

	Normal2: {sx: 0,sy: 134,w: 134,h: 134,frames: 1},
	Relax2: {sx: 134,sy: 134,w: 134,h: 134,frames: 1},
	Angry2: {sx: 268,sy: 134,w: 134,h: 134,frames: 1},
	VeryAngry2: {sx: 402,sy: 134,w: 134,h: 134,frames: 1},

	Normal3: {sx: 0,sy: 268,w: 134,h: 134,frames: 1},
	Relax3: {sx: 134,sy: 268,w: 134,h: 134,frames: 1},
	Angry3: {sx: 268,sy: 268,w: 134,h: 134,frames: 1},
	VeryAngry3: {sx: 402,sy: 268,w: 134,h: 134,frames: 1},

	Normal4: {sx: 0,sy: 402,w: 134,h: 134,frames: 1},
	Relax4: {sx: 134,sy: 402,w: 134,h: 134,frames: 1},
	Angry4: {sx: 268,sy: 402,w: 134,h: 134,frames: 1},
	VeryAngry4: {sx: 402,sy: 402,w: 134,h: 134,frames: 1},

	Served1: {sx: 536,sy: 0,w: 232,h: 143,frames: 1},
	Served2: {sx: 536,sy: 143,w: 232,h: 143,frames: 1},
	Served3: {sx: 536,sy: 286,w: 232,h: 143,frames: 1},
	Served4: {sx: 536,sy: 409,w: 232,h: 143,frames: 1},

	Drinking1: {sx: 766,sy: 0,w: 173,h: 134,frames: 1},
	Drinking2: {sx: 766,sy: 134,w: 173,h: 134,frames: 1},
	Drinking3: {sx: 766,sy: 268,w: 173,h: 134,frames: 1},
	Drinking4: {sx: 766,sy: 402,w: 173,h: 134,frames: 1},

	Drunk1: {sx: 939,sy: 0,w: 138,h: 134,frames: 1},
	Drunk2: {sx: 939,sy: 134,w: 138,h: 134,frames: 1},
	Drunk3: {sx: 939,sy: 268,w: 138,h: 134,frames: 1},
	Drunk4: {sx: 939,sy: 402,w: 138,h: 134,frames: 1}
};
 
var playGame = function(){ 
	var board = new GameBoard();  
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());

	var client = new Client('NPC',0,50);
	boardPlayer.add(new Spawner(client, 1,2,6,0, 50));
	boardPlayer.add(new Spawner(client, 1,1,4,3, 150));
	
	boardPlayer.add(new DeadZone(0));
	boardPlayer.add(new DeadZone(1)); 
	boardPlayer.add(new DeadZone(2)); 
	boardPlayer.add(new DeadZone(3));
	boardPlayer.add(new DeadZone(4));
	boardPlayer.add(new DeadZone(5));
	boardPlayer.add(new DeadZone(6));
	boardPlayer.add(new DeadZone(7));
	boardPlayer.add(new ScoreBar());
	boardPlayer.add(new Lifes());
	
	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);

	Game.deActivateBoard(4);
	Game.deActivateBoard(5);
	Game.deActivateBoard(6);
	Game.activateBoard(2);
	Game.activateBoard(3);



}; 



var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
  Game.setBoard(4,new TitleScreen("Tapper", 
                                  "Press ENTER to start playing","",
                                  playGame));
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,clients,playGame);
});

