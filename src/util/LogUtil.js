/*
 * Simple logging facility, defines a set of simple static methods
 * that output to a rolling array that may be displayed in a
 * log div or some such.
 */

var LogLevel = {
	'trace' : 0,
	'info' : 1,
	'warn' : 2
};

var _logArray = new Array();
var _logIndex = -1;
var _LOG_MAX_COUNT = 50;

function Logger(file) {
	
	this.properties = {
		'file'  : file,
		'level' : LogLevel.info
	};
	
	this.setLevel = function(level) {
		this.properties.level = level;
	}
	
	this.log = function(level, message) {
		
		if (level < this.properties.level) {
			return;
		}
		
		_logIndex++;
		if (_logIndex > LOG_MAX_COUNT) {
			_logIndex = 0;
		}
		
		_logArray[_logIndex] = {
			'level' : level,
			'message' : message
		};
	};

	this.toString = function() {
		var buffer = '';
		
		for (var i = 0; i < _LOG_MAX_COUNT; i++) {
			_logIndex++;
			if (_logIndex > LOG_MAX_COUNT) {
				_logIndex = 0;
			}
			buffer += '[' + _logArray[_logIndex].level + '] ' + _logArray[_logIndex].message + '<br>\n';
		}
		
		return buffer;
	};
}
