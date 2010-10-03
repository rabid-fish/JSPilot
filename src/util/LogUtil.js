/*
 * Simple logging facility.
 * Defines a set of simple static methods that output to a 
 * rolling array that may be displayed in a log div or some 
 * such.
 */

var LogLevel = {
	'trace' : 0,
	'debug' : 1,
	'info'  : 2,
	'warn'  : 3
};

function LogDefaultAppender(selectorMessages) {
	
	var logArray = new Array();
	var logIndex = -1;
	var LOG_MAX_COUNT = 50;
	
	var _selectorMessage = selectorMessages;
	
	this.log = function(source, level, message) {
		
		var source = log.caller;
		
		logIndex++;
		if (logIndex > LOG_MAX_COUNT) {
			logIndex = 0;
		}
		
		logArray[logIndex] = {
			'source' : source,
			'level' : level,
			'message' : message
		};
	};
	
	this.toString = function() {
		var buffer = '';
		
		for (var i = 0; i < LOG_MAX_COUNT; i++) {
			logIndex++;
			if (logIndex > LOG_MAX_COUNT) {
				logIndex = 0;
			}
			buffer += logArray[logIndex].level + ' | ' + logArray[logIndex].source + ' | ' + logArray[logIndex].message + '<br>\n';
		}
		
		return buffer;
	};
}

function Logger(level) {
	
	var properties = {
		'level'         : LogLevel.info,
		'messageCount'  : 0
	};

	this.setLevel = function(level) {
		properties.level = level;
	};
	
	this.clearMessages = function() {
		properties.messageCount = 0;
	};
	
	this.getMessageCount = function() {
		return properties.messageCount;
	};

	this.log = function(level, message) {
		
		if (level < properties.level) {
			return;
		}
		
		properties.messageCount++;
		if (getLogAppender() == null) {
			return;
		}
		
		var source = log.caller;
		getLogAppender().log(source, level, message);
	};
}

// Create a singleton for the appender used across 
// all instances of Logger
var _logAppender = new LogDefaultAppender();

var getLogAppender = function() {
	return _logAppender;
};

var setLogAppender = function(logAppender) {
	_logAppender = logAppender;
};
