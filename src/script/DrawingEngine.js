/*
 * All drawable class definitions may be found here.
 */

var SpriteTypes = {
	'rectangle' : 0,
	'circle' : 1
};

function Canvas() {
	
	var logger = new Logger(LogLevel.trace);
	logger.log(LogLevel.trace, 'Instantiating Canvas');
	
	var properties = {
		'sprites' : new Array()
	};
	
	this.initialize = function() {
	};
	
	this.addSprite = function(name, type) {
		var sprites = properties.sprites;
		var sprite = new Sprite(name, type);
//		alert(sprite.debug());
		sprites[sprites.length] = sprite;
	};
	
	this.draw = function() {
	};
	
	this.debug = function() {
		var buffer = '';
		
		alert(properties.sprites.length);
		for (var sprite in properties.sprites) {
			alert(sprite);
			buffer += sprite.debug() + "<br>\n";
		}
		
		alert(buffer);
		
		$('#debug').html(buffer);
	};
}

function Sprite(name, type) {
	
	var logger = new Logger(LogLevel.trace);
	logger.log(LogLevel.trace, 'Instantiating Sprite "' + name + '"');
	
	var properties = {
		'name' : name,
		'type' : type
	};
	
	this.initialize = function() {
	};
	
	this.draw = function() {
	};
	
	this.debug = function() {
		return properties.name + ' - ' + properties.type;
	};
}
