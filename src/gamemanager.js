var GameManager = new function(){
	this.maxScore=0;
	this.clients=0;
	this.glass=0;
	this.score=0;
	this.lifes=3;
	this.deadGlass=0;
	this.deadClients=0;

	this.alertClient = function(clients){
		this.clients+=clients;
	};

	this.alertBeer = function(){
		++this.glass;
	};

	this.alertBeerCollected = function(){
		--this.glass;
		this.score+=100;
	};

	this.alertServedClient = function(){
		--this.clients;
		this.score+=50;
		
	};

	this.checkGameState = function(){
		console.log(this.clients, this.deadClients, this.glass, this.deadGlass);
		if(this.lifes==0){
			this.loseGame();
		}
		if(this.clients==0 && this.glass==0){
			console.log('no quedan clientes ni cervezas, has ganado');
			this.winGame();
		}else if(((this.glass-this.deadGlass==0) && (this.clients-this.deadClients==0))){
			this.loseGame();
		}


	};

	this.alertClientDeadZone = function(){
		--this.lifes;
		++this.deadClients;
	};

	this.alertGlassDeadZone = function(){
		--this.lifes;
		++this.deadGlass;
	};

	this.alertBeerDeadZone = function(){
		--this.lifes;
	};

	this.resetStatus = function(){
		if(this.score> this.maxScore){
			this.maxScore= this.score;
		}

		this.clients=0;
		this.glass=0;
		this.score=0;
		this.deadClients=0;
		this.deadGlass=0;
		this.lifes=3;
	};

	this.loseGame = function(){
		this.resetStatus();	
		Game.deActivateBoard(2);
		Game.deActivateBoard(3);
		Game.setBoard(5,new TitleScreen("You lose!", 
                                  "Press ENTER to play again"," MaxScore: "+ this.maxScore,
                                  playGame));

	};

	this.winGame = function(){
		this.resetStatus();
		Game.deActivateBoard(2);
		Game.deActivateBoard(3);
		Game.setBoard(6,new TitleScreen("You win!!", 
                                  "Press ENTER to start playing"," MaxScore: "+ this.maxScore,
                                  playGame));
	};

};