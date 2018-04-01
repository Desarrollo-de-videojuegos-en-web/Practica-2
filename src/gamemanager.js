var GameManager = new function(){
	this.clients=0;
	this.glass=0;

	this.alertClient = function(clients){
		this.clients+=clients;
	};

	this.alertBeer = function(){
		++this.glass;
	};

	this.alertBeerCollected = function(){
		--this.glass;
	};

	this.alertServedClient = function(){
		--this.clients;
		
	};

	this.checkGameState = function(){
		console.log(this.clients, this.glass);
		if(this.clients==0 && this.glass==0){
			console.log('no quedan clientes ni cervezas, has ganado');
			this.winGame();
		}
	};

	this.alertClientDeadZone = function(){
		console.log('cliente en la deadzone, has perdido');
	};

	this.alertJarDeadZone = function(){
		console.log('cerveza en la deadzone, has perdido');
	};

	this.loseGame = function(){
		console.log('lose');
	};

	this.winGame = function(){

	};
};