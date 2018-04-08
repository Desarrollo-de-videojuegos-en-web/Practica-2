/**
 * Determina los diferentes tipos de objetos usados dentro del juego para gestionar las colisiones
 */
var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8,
    OBJECT_GLASS = 16,
    OBJECT_TIP = 32,
    OBJECT_SERVED_CLIENT = 64,
    OBJECT_NULL = 128;

/**
 * Sprites usados en la parte basica del juego.
 */
var sprites = {
	Beer: {sx: 512,sy: 99,w: 23,h: 32,frames: 1},
	Glass: {sx: 512,sy: 131,w: 23,h: 32,frames: 1},
	NPC: {sx: 512,sy: 66,w: 33,h: 33,frames: 1},
	ParedIzda: {sx: 0,sy: 0,w: 512,h: 480,frames: 1},
	Player: {sx: 512,sy: 0,w: 56,h: 66,frames: 1},
	TapperGameplay: {sx: 0,sy: 480,w: 512,h: 480,frames: 1}
};

/**
 * Sprites de los clientes usados en las modificaciones extra
 */
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

	Drunk1: {sx: 939,sy: 0,w: 138,h: 134,frames: 1},
	Drunk2: {sx: 939,sy: 134,w: 138,h: 134,frames: 1},
	Drunk3: {sx: 939,sy: 268,w: 138,h: 134,frames: 1},
	Drunk4: {sx: 939,sy: 402,w: 138,h: 134,frames: 1}
};
 
/**
 * Sprites del jugador usados en las modificaciones extra
 */
var barman = {
	Cleaning1: {sx: 132,sy: 113,w: 143,h: 268,frames: 1},
	Cleaning2: {sx: 521,sy: 113,w: 143,h: 268,frames: 1},
	Serving1: {sx: 889,sy: 24,w: 225,h: 356,frames: 1},
	Serving2: {sx: 1285,sy: 24,w: 225,h: 356,frames: 1},
	Runing1: {sx: 80,sy: 509,w: 237,h: 273,frames: 1},
	Runing2: {sx: 482,sy: 509,w: 237,h: 273,frames: 1},
	Runing3: {sx: 882,sy: 509,w: 237,h: 273,frames: 1},
	Runing4: {sx: 1282,sy: 509,w: 237,h: 273,frames: 1},
	FilledBeer: {sx: 1811,sy: 131,w: 79,h: 119,frames: 1},
	Scare: {sx: 1740,sy: 527,w: 122,h: 251,frames: 1},
	Blow1: {sx: 117,sy: 936,w: 149,h: 127,frames: 1}, 
	Blow1: {sx: 515,sy: 936,w: 149,h: 127,frames: 1},
	Blow1: {sx: 921,sy: 936,w: 149,h: 127,frames: 1},
	Blow1: {sx: 1357,sy: 936,w: 149,h: 127,frames: 1}
};

/**
 * Gestiona los componentes del juego y los añade a sus respectivos tableros
 */
var playGame = function(){ 
	var board = new GameBoard();  
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	
	boardPlayer.add(new Player());

	var client = new Client('NPC',0,150);

	boardPlayer.add(new Spawner(client, 2,10,12,0, 150));
	boardPlayer.add(new Spawner(client, 2,2,5,1, 150));
	boardPlayer.add(new Spawner(client, 2,5,3,2, 150));
	boardPlayer.add(new Spawner(client, 2,7,6,3, 150));

	boardPlayer.add(new DeadZone(0));
	boardPlayer.add(new DeadZone(1)); 
	boardPlayer.add(new DeadZone(2)); 
	boardPlayer.add(new DeadZone(3));
	boardPlayer.add(new DeadZone(4));
	boardPlayer.add(new DeadZone(5));
	boardPlayer.add(new DeadZone(6));
	boardPlayer.add(new DeadZone(7));
	boardPlayer.add(new Lifes());
	boardPlayer.add(new GamePoints());
	
	Game.setBoard(2,board);
	Game.setBoard(3,boardPlayer);

	Game.deActivateBoard(4);
	Game.deActivateBoard(5);
	Game.deActivateBoard(6);
	Game.activateBoard(2);
	Game.activateBoard(3);



}; 

/**
 * Lanza la pantalla de titulo y arranca el juego.
 */
var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
  Game.setBoard(4,new TitleScreen("Tapper", 
                                  "Press ENTER to start playing","",
                                  playGame));
};

/**
 * Avisa a Game de engine.js para que inicie el juego.
 */
window.addEventListener("load", function() {
  Game.initialize("game",sprites,clients,barman,startGame);
});

