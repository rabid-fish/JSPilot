/*
 * All drawable class definitions may be found here.
 */

var SpriteTypes = {
	'rectangle' : 0,
	'circle' : 1
};

function Canvas() {
	
	this.properties = {
		'sprites' : new Array()
	};
	
	this.initialize = function() {
	};
	
	this.addSprite = function(name, type) {
		var sprites = this.properties.sprites;
		var sprite = new Sprite(name, type);
//		alert(sprite.debug());
		sprites[sprites.length] = sprite;
	};
	
	this.draw = function() {
	};
	
	this.debug = function() {
		var buffer = '';
		
		alert(this.properties.sprites.length);
		for (var sprite in this.properties.sprites) {
			alert(sprite);
			buffer += sprite.debug() + "<br>\n";
		}
		
		alert(buffer);
		
		$('#debug').html(buffer);
	};
}

function Sprite(name, type) {
	
	this.properties = {
		'name' : name,
		'type' : type
	};
	
	this.initialize = function() {
	};
	
	this.draw = function() {
	};
	
	this.debug = function() {
		return this.properties.name + ' - ' + this.properties.type;
	};
}
