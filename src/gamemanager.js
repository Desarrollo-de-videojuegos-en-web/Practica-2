/**
 * Clase que gestiona las condiciones de finalización del juego.
 */
 var GameManager = new function(){
	this.maxScore=0;
	this.clients=0;
	this.glass=0;
	this.lifes=3;
	this.deadGlass=0;
	this.deadClients=0;

	// actualiza el numero de clientes del nivel
	this.alertClient = function(clients){
		this.clients+=clients;
	};

	// incrementa el numero de jarras vacias generadas
	this.alertBeer = function(){
		++this.glass;
	};

	// actualiza el score y detrimenta el numero de jarras vacias
	this.alertBeerCollected = function(){
		--this.glass;
		Game.points+=100;
	};

	// actualiza el score y detrimenta el numero de clientes
	this.alertServedClient = function(){
		--this.clients;
		Game.points+=50;

		
	};

	// comprueba el estado del juego y decide si se ha ganado o perdido
	this.checkGameState = function(){	
		if(this.lifes==0){
			this.loseGame();
		}else if(this.lifes!=0 && (this.clients==0 && this.glass==0)){
			this.winGame();
		}
	};

	// indica que una jarra vacia colisiono con una deadzone (no se toca el score)
	this.removeGlass = function(){
		--this.glass;
	};

	// disminuye el contador de vidas cuando una jarra vacia choca con la deadzone
	this.alertGlassDeadZone = function(){
		--this.lifes;
	};

	// disminuye el contador de vidas cuando una jarra llena choca con una deadzone
	this.alertBeerDeadZone = function(){
		--this.lifes;
	};

	// restaura los valores iniciales del juego y actualiza la puntuacion maxima
	this.resetStatus = function(){
		if(Game.points> this.maxScore){
			this.maxScore = Game.points;
		}

		this.clients=0;
		this.glass=0;
		this.deadClients=0;
		this.deadGlass=0;
		this.lifes=3;
	};

	// gestiona los tableros activos y muestra la pantalla de game over
	this.loseGame = function(){
		this.resetStatus();	
		Game.deActivateBoard(2);
		Game.deActivateBoard(3);
		Game.setBoard(5,new TitleScreen("You lose!", 
                                  "Press ENTER to play again"," MaxScore: "+ this.maxScore,
                                  playGame));

	};

	// gestiona los tableros y muestra la pantalla de victoria
	this.winGame = function(){
		this.resetStatus();
		Game.deActivateBoard(2);
		Game.deActivateBoard(3);
		Game.activateBoard(6);
		Game.setBoard(6,new TitleScreen("You win!!", 
                                  "Press ENTER to start playing"," MaxScore: "+ this.maxScore,
                                  playGame));
	};
};