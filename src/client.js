/**
 * Valores que determinan los cambios de sprite de los clientes.
 */
const ANGRY_DELAY = 40
const BUSY_DELAY = 45
const DELAY = 25

/**
 * Posiciones de los clientes.
  */
var clientPos = {
	0:{x:120,y:90},
	1:{x:90,y:185},
	2:{x:60,y:281},
	3:{x:30,y:377}	
};

/**
 * Posibles estados de los clientes.
 */
var clientState = ['Relax','Normal', 'Angry', 'VeryAngry', 'Served', 'Drinking','Drunk'];

/**
 * Clase que representa las los clientes del juego.
 * @param {sprite} spite del cliente
 * @param {pos} barra en la que crear el cliente
 * @param {vx} velocidad del cliente
 */
var Client = function(sprite, pos, vx){
	this.setup(sprite, {x:clientPos[pos].x, y:clientPos[pos].y, vx:vx});
	this.delay=DELAY;
	this.delayAngry=ANGRY_DELAY;
	this.busyDelay=BUSY_DELAY;
	this.vel = vx;
	this.busy = false;
	this.drunk = false;
	this.counter=0;

	this.step = function(dt){
		this.x += this.vx*dt;
		
		var index = clientState.indexOf(this.sprite.substring(0,this.sprite.length-1));
		
		/*En esta clausula if-else controlamos los cambios 
		de los sprites del cliente, alternando entre 'enfadado'
		y 'muy enfadado' en base al valor de this.delay un total 
		de 3 veces*/
		if(this.delay==0 && !this.busy && !this.drunk){
			this.vx=0;
			if(this.delayAngry==ANGRY_DELAY){
				this.sprite = ('VeryAngry' + this.sprite.slice(-1));
			}
			--this.delayAngry;
			if(this.delayAngry==ANGRY_DELAY/2){
				this.sprite = ('Angry' + this.sprite.slice(-1));
			}
			if(this.delayAngry==0){
				this.delayAngry=ANGRY_DELAY;
				++this.counter;
			}	
		}else if(this.delay!=0 && !this.busy && !this.drunk){
			--this.delay;
		}

		/*Aquí restauramos el sprite original del cliente
		tras haberse enfadado 3 veces*/
		if(this.delay==0 && this.counter==3 && !this.busy && !this.drunk){
			this.vx=this.vel;
			this.delay=DELAY;
			this.sprite = ('Normal' + this.sprite.slice(-1));
			this.counter=0;
		}

		/*this.busy se activa cuando el cliente ha colisionado
		con una cerveza, de manera que en este bucle el cliente avanza
		hacia atrás el tiempo marcado por this.busyDelay*/
		if(this.busy){
			--this.busyDelay;
			if(this.busyDelay==0){
				this.type = OBJECT_CLIENT;
				this.busyDelay=BUSY_DELAY;
				this.busy=false;
				this.vx=this.vel;
			}
		}
		var collision = this.board.collide(this,OBJECT_BEER);
		if(collision) {
			GameManager.alertBeer();
			GameManager.checkGameState();
			collision.hit(0);
			// la cerveza colisiona y generamos la jarra vacía
			this.board.add(Object.create(collision, {
				sprite:{
					writable:true, configurable:true, value:'Glass'
				},
				vx:{
					writable:true, configurable:true, value: -150
				},
				type:{
					writable:true, configurable:true, value: OBJECT_GLASS
				},
			}))
			this.sprite = ('Relax' + this.sprite.slice(-1));
			this.type = OBJECT_SERVED_CLIENT;
			this.vx = -this.vel;
			this.busy=true;
		}
		};
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

