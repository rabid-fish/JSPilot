/*
 * So here's my thinking so far: this file will contain the only
 * document onload initializer as well as the game loop.  Any
 * form control actions go through here, too.  But class def's
 * and game logic do not belong here.
 */

$(document).ready(function() {

	var canvas = new Canvas();
	canvas.addSprite('one', SpriteTypes.rectangle);
	canvas.addSprite('two', SpriteTypes.circle);
});
