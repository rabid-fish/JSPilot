/*
 * So here's my thinking so far: this file will contain the only
 * document onload initializer as well as the game loop.  Any
 * form control actions go through here, too.  But class def's
 * and game logic do not belong here.
 */

$(document).ready(function() {
	
	// Configure logging
	setLogConfig({ 'level' : LogLevel.trace });
	
	// Set up sprites
	var canvas = new Canvas('canvas');
	canvas.addSprite('one', SpriteTypes.triangle, [10, 10]);
	canvas.addSprite('two', SpriteTypes.circle, [50, 15]);
	canvas.addSprite('three', SpriteTypes.rectangle, [5, 65]);
	canvas.draw();
});
