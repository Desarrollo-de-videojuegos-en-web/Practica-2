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

/*var beer = {
	{x:325,y:90},
	{x:357,y:185},
	{x:389,y:281},
	{x:421,y:377}
};

var client = {
	{x:120,y:90},
	{x:90,y:185},
	{x:60,y:281},
	{x:30,y:377}
};

var player = {	
	{x:325,y:90},
	{x:357,y:185},
	{x:389,y:281},
	{x:421,y:377}
};

var leftDeadzone = {
	{x:120,y:90},
	{x:90,y:185},
	{x:60,y:281},
	{x:30,y:377}
};

var rigthDeadzone = {
	{x:325,y:90},
	{x:357,y:185},
	{x:389,y:281},
	{x:421,y:377}
};*/


var playerVPos = [90,185,281,377];
var playerHPos = [325,357,389,421];

var clientVPos = [90,185,281,377];
var clientHPos = [120,90,60,30];

var beerVPos = [90,185,281,377];
var beerHPos = [325,357,389,421];

var leftLimits = [120,90,60,30];
var rigthLimits = [325,357,389,421];


















var playGame = function(){
	var board = new GameBoard();
	board.add(new BackSprite());
	var boardPlayer = new GameBoard();
	boardPlayer.add(new Player());
	var spawn1 = new Spawner(boardPlayer, 2,0,3000,500, 0);
	var spawn2 = new Spawner(boardPlayer, 3,0,1500,1000, 1);
	console.log(boardPlayer);
	spawn1.run();
	spawn2.run();
	
	// estos 8 no valen
	/*boardPlayer.add(new DeadZone(150, 90, 10, 70));
	boardPlayer.add(new DeadZone(120, 185, 10, 70));
	boardPlayer.add(new DeadZone(90, 281, 10, 70));
	boardPlayer.add(new DeadZone(60, 377, 10, 70));*/

	/*boardPlayer.add(new DeadZone(305, 90, 10, 70));
	boardPlayer.add(new DeadZone(337, 185, 10, 70));
	boardPlayer.add(new DeadZone(369, 281, 10, 70));
	boardPlayer.add(new DeadZone(401, 377, 10, 70));*/


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

