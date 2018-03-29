var GameManager = new function(){
	this.clients=0;
	this.glass=0;

	this.alertClient = function(clients){
		this.clients+=clients;
		console.log('añadidos ' + clients + ' clientes');
	};

	this.alertBeer = function(){
		this.glass = this.glass+1;
		console.log('glass creada');
	};

	this.alertBeerCollected = function(){
		this.glass-=1;
		console.log('glass recogida');
	};

	this.alertServedClient = function(){
		this.clients-=1;
		
	};

	this.checkGameState = function(){
		console.log(this.clients, this.glass);
		if(this.clients==0 && this.glass==0){
			console.log('no quedan clientes ni cervezas, has ganado');
		}
	};

	this.alertClientDeadZone = function(){
		console.log('cliente en la deadzone, has perdido');
	};

	this.alertJarDeadZone = function(){
		console.log('cerveza en la deadzone, has perdido');
	};

};