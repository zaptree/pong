var canvas,ctx;
$(function(){


	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	$('body').append(canvas);


});


var playerObject = {
	posx:100,
	posy:100,
	speed:1,
	events:{
		'player.left':'moveLeft',
		'player.right':'moveRight'
	},
	moveLeft:function(){
		this.posx+=this.speed;
	},
	moveRight:function(){
		this.posx-=this.speed;
	},
	draw:function(){
		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";

		ctx.fillRect (this.posx, this.posy, 100, 10);
	}
};

var inputHandler = {
	subscribers:[],
	bindings:{
		'left':'player.left',
		'right':'player.right'
	},
	keyMap:{
		37:'left',
		39:'right'
	},
	initialize:function(){
		var _this = this;
		$(window).on('keydown',function(e){
			var event = _this.keyMap[e.keyCode];
			if(event && _this.bindings[event]){
				_this.emit(event);
			}
		});
	},
	emit:function(event){

		this.subscribers.forEach(function(subscriber){
			console.log(event);
			subscriber(event);
		});
	},
	subscribe:function(subscriber){
		this.subscribers.push(subscriber);
	}

};
inputHandler.initialize();

//$(window).on('keydown',function(e){
//	//e.preventDefault();
//	var keyMap = {
//		37:'left',
//		39:'right'
//	};
//	console.log(e.keyCode);
//	return false;
//});

var gameState = {

	draw:function(events){

		//foreach object fire any events it is bound to

		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect (130, 130, 10, 100);

		ctx.fillRect (530, 130, 10, 100);

		ctx.beginPath();
		ctx.arc(230,130,10,0,Math.PI*2,true); // Outer circle
		ctx.fill();
	}
};

var game = {
	states:{},
	currentState:null,
	start:function(){
		var _this = this;
		this.states.game = gameState;
		this.currentState = 'game';

		this.loadAssets(function(){
			setInterval(function(){
				_this.draw();
			},17);
		});
	},
	draw:function(){

		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect (130, 130, 10, 100);

		ctx.fillRect (530, 130, 10, 100);

		ctx.beginPath();
		ctx.arc(230,130,10,0,Math.PI*2,true); // Outer circle
		ctx.fill();
	},
	loadAssets:function(callback){
		callback();
	}
};
