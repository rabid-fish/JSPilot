/*
 * Simple logging facility.
 * Defines a set of simple static methods that output to a 
 * rolling array that may be displayed in a log div or some 
 * such.
 */

var LogLevel = {
	'trace' : 1,
	'debug' : 2,
	'info'  : 3,
	'warn'  : 4
};

function DefaultLogAppender() {
	
	// We'll use composition to make HtmlMessageAppender a parent
	// class until we understand javascript inheritance better.
	var parent = new HtmlMessageAppender('#log', 50);
	
	this.clear = function() {
		parent.clear();
	}
	
	this.append = function(source, level, message) {
		parent.append(level + ' | ' + source + ' | ' + message);
		parent.draw();
	};
}

function Logger(level, appender) {
	
	var loggerLevel = level ? level : LogLevel.info;
	var loggerMessageCount = 0;
	var loggerAppender = appender ? appender : getLogAppender();
	
	this.setLevel = function(level) {
		loggerLevel = level;
	};
	
	this.clearMessages = function() {
		loggerAppender.clear();
		loggerMessageCount = 0;
	};
	
	this.getMessageCount = function() {
		return loggerMessageCount;
	};

	this.log = function(level, message) {
		
		if (level < loggerLevel) {
			return;
		}
		
		loggerMessageCount++;
		var source = arguments.callee.caller.name;
		loggerAppender.append(source, level, message);
	};
}

// Create a singleton for the appender, this appender will be used across 
// all instances of Logger.  Also, lazy instantiate the appender, as we
// will not have access to the DOM until after document.ready.
var _logAppender = null;

var getLogAppender = function() {
	if (_logAppender == null) _logAppender = new DefaultLogAppender();
	return _logAppender;
};

var setLogAppender = function(logAppender) {
	_logAppender = logAppender;
};
