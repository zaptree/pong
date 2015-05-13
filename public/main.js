//http://brm.io/matter-js/
//http://www.html5rocks.com/en/tutorials/canvas/performance/
//https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
$(function(){


	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = 400;//window.innerWidth;
	canvas.height = 600; window.innerHeight;

	$('body').append(canvas);



	var speed = 20;
	var playerPositionX = 149;
	var playerPositionY = 560;
	var opponentPositionX = 149;
	var opponentPositionY = 30;
	var lastFrameTime = 0;
	var t,delta;
	speed = speed / 100;
	function draw(timePassed){
		//t = new Date().getTime();
		var delta = timePassed - lastFrameTime;
		lastFrameTime = timePassed;
		if(delta < 100){
			//console.log(delta);
			var events = getKeyEvents();
			if(events.left){
				//console.log('woot')
				playerPositionX-=(speed * delta);
			}
			if(events.right){
				playerPositionX+=(speed * delta);
			}
			//clear canvas
			ctx.clearRect(0, 0, 400, 600);

			ctx.fillStyle = "rgba(0, 0, 200, 1)";
			ctx.strokeStyle = "rgba(0, 0 ,200, 1)";

			ctx.strokeRect(0,0,400,600);

			//player
			ctx.fillRect (playerPositionX, playerPositionY, 100, 10);

			ctx.fillRect (opponentPositionX, opponentPositionY, 100, 10);

		}
		window.requestAnimationFrame(draw);


	}




	var bindings = {
		'left':37,
		'right':39
	};
	var currentlyPressed = [];
	var pressed = [];
	function getKeyEvents(){
		var events = {};
		for(alias in bindings){
			var keyCode = bindings[alias];
			if(pressed.indexOf(keyCode) > -1){
				events[alias] = true;
			}
		}

		//console.log(events);
//we want to add for next game loop all buttons that are currently pressed
		pressed = currentlyPressed.slice();
		return events;



	}
	$(window).on('keydown',function(e){
		var keyCode = e.keyCode;
		var index = currentlyPressed.indexOf(keyCode);

		//really I should not add these in here if they do not exist
		if(index === -1){
			pressed.push(keyCode);
			currentlyPressed.push(keyCode);
		}
		return false;
	});
	$(window).on('keyup',function(e){
		var keyCode = e.keyCode;
		var index = currentlyPressed.indexOf(keyCode);
		if(index > -1){
			currentlyPressed.splice(index,1);
		}
		return false;
	});
	$(window).on('blur',function(){
		currentlyPressed = [];
		pressed = [];
	});



	window.requestAnimationFrame(draw);


});