
var Spawner = function(client, num, delay, frec, pos, vel){
    this.client = client;
    this.num = num;
    this.maxFrequency = frec;
    this.tmpFrequency = 0;
    this.delay = delay;
    this.pos = pos;
    this.vel = vel;
    GameManager.alertClient(num);
}

Spawner.prototype.draw = function(){
    return;
}

Spawner.prototype.step = function(dt){
    if(this.delay > 0) {this.delay -= dt;}
    else{
    	if(this.tmpFrequency > 0) {this.tmpFrequency -= dt;}
    	else{
	        if(this.tmpFrequency <= 0){
	            this.board.add(Object.create(this.client, {
	            	sprite:{
						writable:true, 
	            		configurable:true, 
	            		value: 'Relax'+ Math.round(Math.random() * (3) + 1)
	            	},
	            	x:{
	            		writable:true, 
	            		configurable:true, 
	            		value: clientPos[this.pos].x
	            	},
	            	y:{
	            		writable:true, 
	            		configurable:true, 
	            		value: clientPos[this.pos].y
	            	},
					vx:{
	            		writable:true, 
	            		configurable:true, 
	            		value: this.vel
	            	}
	            }));
	            this.tmpFrequency = this.maxFrequency;
	            if(--this.num === 0)
	                this.board.remove(this);
	        }
	    }
    }  
}