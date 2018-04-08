/**
 * Clase que representa los generadores de clientes.
 * @param {client} cliente a clonar
 * @param {num} numero de clientes a generar
 * @param {delay} velocidad respecto al inicio del juego para generar los clientes
 * @param {frec} frecuencia de generacion de clientes
 * @param {pos} posicion de la barra en la que generar los clientes
 * @param {vel} velocidad de los clientes
 */
var Spawner = function(client, num, delay, frec, pos, vel){
    this.client = client;
    this.num = num;
    this.maxFrequency = frec;
    this.tmpFrequency = 0;
    this.delay = delay;
    this.pos = pos;
    this.vel = vel;
    GameManager.alertClient(num); // avisamos al gamemanager de los clientes que generamos
}

Spawner.prototype.draw = function(){
    return;
}

/**
 * Gestina los eventos del spawner.
 */
Spawner.prototype.step = function(dt){
    if(this.delay > 0) {this.delay -= dt;} // espera el tiempo indicado antes de generar clientes
    else{
    	if(this.tmpFrequency > 0) {this.tmpFrequency -= dt;} // espera el tiempo indicado entre la generecion de cada cliente
    	else{
	        if(this.tmpFrequency <= 0){
	            this.board.add(Object.create(this.client, { // conamos el cliente prototipo y modificamos sus campos
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
	            if(--this.num === 0) // eliminamos el spawner del tablero cuando haya terminado su funcion
	                this.board.remove(this);
	        }
	    }
    }  
}