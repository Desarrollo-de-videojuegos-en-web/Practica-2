var GameManager = new function(){
	this.clients=0;
	this.glass=0;
	this.score=0;
	this.lives=3;
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
		console.log(this.clients, this.glass);
		
		if(this.clients==0 && this.glass==0){
			console.log('no quedan clientes ni cervezas, has ganado');
			this.winGame();
		}

		if((this.glass-this.deadGlass==0 && this.clients-this.deadClients==0) || this.lives==0){
			this.loseGame();
		}


	};

	this.alertClientDeadZone = function(){
		--this.lives;
		++this.deadClients;
	};

	this.alertJarDeadZone = function(){
		--this.lives;
		++this.deadGlass;
	};

	this.resetStatus = function(){
		this.clients=0;
		this.glass=0;
		this.score=0;
		this.lives=3;
	};

	this.loseGame = function(){
		console.log('lose');
		this.resetStatus();
		Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press ENTER to play again",
                                  playGame));
	};

	this.winGame = function(){
		this.resetStatus();
		Game.setBoard(3,new TitleScreen("You win!!", 
                                  "Press ENTER to start playing",
                                  playGame));
	};

};