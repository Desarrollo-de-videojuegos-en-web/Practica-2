var clientPos = {
	0:{x:120,y:90},
	1:{x:90,y:185},
	2:{x:60,y:281},
	3:{x:30,y:377}	
};
var clientState = ['Relax','Normal', 'Angry', 'VeryAngry', 'Served', 'Drinking','Drunk'];

var Client = function(sprite, pos, vx){
	this.setup(sprite, {x:clientPos[pos].x, y:clientPos[pos].y, vx:vx});
	this.delay=25;
	this.delayAngry=100;
	this.counter=0;
	this.beers=0;
	this.vel = vx;
	this.step = function(dt){
		this.x += this.vx*dt;
		var collision = this.board.collide(this,OBJECT_BEER);
		
		var index = clientState.indexOf(this.sprite.substring(0,this.sprite.length-1));
		
		if(this.delay==0){
			this.vx=0;
			
			if(this.delayAngry==75){
				this.sprite = ('VeryAngry' + this.sprite.slice(-1));
			}
			--this.delayAngry;
			if(this.delayAngry==40){
				this.sprite = ('Angry' + this.sprite.slice(-1));
			}
			if(this.delayAngry==0){
				this.delayAngry=75;
				++this.counter;
			}	
		}else{
			--this.delay;
		}

		if(this.delay==0 && this.counter==2){
			this.vx=this.vel;
			this.delay=50;
			this.sprite = (clientState[(index+1)%2] + this.sprite.slice(-1));
			this.counter=0;
		}
		if(collision) {
			GameManager.alertServedClient();
			GameManager.alertBeer();
			GameManager.checkGameState();
			this.board.remove(this);
			collision.hit(0);
			this.board.add(Object.create(collision, {
				sprite:{
					writable:true, configurable:true, value:'Glass'
				},
				vx:{
					writable:true, configurable:true, value: -collision.vx
				},
				type:{
					writable:true, configurable:true, value: OBJECT_GLASS
				},
			}))
		}
		};
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

