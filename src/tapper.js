 var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8;

var sprites = {
	Beer: {sx: 512,sy: 99,w: 23,h: 32,frames: 1},
	Glass: {sx: 512,sy: 131,w: 23,h: 32,frames: 1},
	NPC: {sx: 512,sy: 66,w: 33,h: 33,frames: 1},
	ParedIzda: {sx: 0,sy: 0,w: 512,h: 480,frames: 1},
	Player: {sx: 512,sy: 0,w: 56,h: 66,frames: 1},
	TapperGameplay: {sx: 0,sy: 480,w: 512,h: 480,frames: 1}
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
	board.add(new ScoreBar());

	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);
};

var loseGame = function() {
  	Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press ENTER to play again",
                                  playGame));
};


var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
  Game.setBoard(3,new TitleScreen("Tapper", 
                                  "Press ENTER to start playing",
                                  playGame));
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});

