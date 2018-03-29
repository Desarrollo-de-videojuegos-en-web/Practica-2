var Spawner = function(boardPlayer, clients, type, frequency, delay, bar){
	GameManager.alertClient(clients);
	this.proto = new Client();
	this.board = boardPlayer;
	this.clients = clients;
	this.type = type;
	this.frequency = frequency;
	this.delay = delay;
	this.bar = bar;
};
 
Spawner.prototype.run = function(dt) {
	this.generateClients(this);
};

Spawner.prototype.generateClients = function(that){
	for(i=0; i<that.clients; i++){
		that.delay+=Math.floor((Math.random() * 1000) + 0);
		setTimeout(function(){
			that.board.add(that.clone(that.bar, that.proto));
			console.log(that.board);
		}, that.delay + that.frequency*i);
	}
};

Spawner.prototype.clone = function (bar, proto) {
        var client = new Client(bar,5);
        client.x = clientHPos[bar];
        client.y = clientVPos[bar];
        client.sprite = proto.sprite;
        return client;
};