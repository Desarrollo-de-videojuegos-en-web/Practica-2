var deadZone = [
	{ x: 345, y: 90 },
    { x: 377, y: 185 },
    { x: 409, y: 281 },
    { x: 441, y: 377 },
    { x: 95, y: 90 },
    { x: 65, y: 185 },
    { x: 35, y: 281 },
    { x: 5, y: 377 }
];

var DeadZone = function(pos){
	this.x=deadZone[pos].x;
	this.y=deadZone[pos].y;
	this.w=10;
	this.h=65;

	this.step = function(dt){
		var client = this.board.collide(this,OBJECT_CLIENT);
		if(client) {
			client.hit();
			GameManager.alertClientDeadZone();
			GameManager.checkGameState();
		}
		var glass = this.board.collide(this,OBJECT_GLASS);
		if(glass) { 
			glass.hit();
			var breakGlass = Object.create(glass, {
				sprite:{
					writable:true, configurable:true, value:'Beer'
				},
				x:{
					writable:true, configurable:true, value: glass.x+25
				},
				y:{
					writable:true, configurable:true, value: glass.y+25
				},
				vx:{
					writable:true, configurable:true, value: 0
				},
				type:{
					writable:true, configurable:true, value: OBJECT_NULL
				},
				delay:{
					writable:true, configurable:true, value: 15
				}
			});
			this.board.add(breakGlass);
			GameManager.alertGlassDeadZone();
			//GameManager.checkGameState();
		}
		var beer = this.board.collide(this,OBJECT_BEER);
		if (beer){
			beer.hit();
			GameManager.alertBeerDeadZone();
			GameManager.checkGameState();
		}
	};
};

DeadZone.prototype = new Sprite();

DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.draw = function(ctx){
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "green";
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
};