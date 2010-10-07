/*
 * All drawable class definitions may be found here.
 */

var SpriteTypes = {
	'triangle' : 1,
	'rectangle' : 2,
	'circle' : 3
};

function Canvas(id) {
	
	trace('Instantiating Canvas');
	
	var canvas = document.getElementById(id);
	var context = document.getElementById(id).getContext('2d');
	var sprites = new Array();
	
	this.initialize = function() {
		canvas.width = $(canvas).width();
		canvas.height = $(canvas).height();
		context.lineWidth = 2;
	};
	
	var clear = function() {
		canvas.width = $(canvas).width();
		canvas.height = $(canvas).height();
	};
	
	this.addSprite = function(name, type, location) {
		var sprite = new Sprite(name, type, location);
		sprites[sprites.length] = sprite;
	};
	
	this.draw = function() {
		
		clear();
		
		for (var i = 0; i < sprites.length; i++) {
			context.save();
			sprites[i].drawSprite(context);
			context.restore();
		}
	};
	
	this.toString = function() {
		var buffer = '';
		
		for (var i = 0; i < sprites.length; i++) {
			buffer += sprite[i].toString() + "<br>\n";
		}
		
		return buffer;
	};
	
	this.initialize();
}

function Sprite(name, type, location) {
	
	trace('Instantiating Sprite "' + name + '"');
	
	var name = name;
	var type = type;
	var location = location;
	var drawSpecificSprite = function(){};
	
	this.drawSprite = function(context){
		context.beginPath();
		context.strokeStyle = "#000000";
		
		drawSpecificSprite(context, location[0], location[1]);
		
		context.closePath();
		context.stroke();
	};
	
	switch (type) {
	case SpriteTypes.triangle:
		drawSpecificSprite = SpriteTriangle;
		break;
	case SpriteTypes.circle:
		drawSpecificSprite = SpriteCircle;
		break;
	case SpriteTypes.rectangle:
		drawSpecificSprite = SpriteRectangle;
		break;
	}
	
	this.toString = function() {
		return name + ' - ' + type;
	};
}

function SpriteTriangle(context, x, y) {
	
	var size = 20;
	var half = size / 2;
	
	context.translate(x, y);
	context.moveTo(half, 0);
	context.lineTo(size, size);
	context.lineTo(0, size);
	context.lineTo(half, 0);
}

function SpriteCircle(context, x, y) {
	
	var size = 20;
	var half = size / 2;
	
	context.translate(x, y);
	context.moveTo(size, half);
	context.arc(half, half, half, 0, Math.PI* 2);
	
	/*
	context.stroke();
	
	context.closePath();
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = "#FF0000";
	context.rect(0, 0, size, size);
	*/
}

function SpriteRectangle(context, x, y) {
	
	var size = 20;

	context.translate(x, y);
	context.rect(0, 0, size, size);
}
