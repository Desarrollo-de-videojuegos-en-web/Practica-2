var ScoreBar = function(){
	this.step = function(dt){
		
	};
};

ScoreBar.prototype = new Sprite();

ScoreBar.prototype.draw = function(ctx){
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "yellow";
		ctx.font="20px Georgia";
		ctx.fillText("Score: " + GameManager.score,10,20);
	}
};