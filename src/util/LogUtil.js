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
		getLogAppender().append(source, level, message);
	};
}

// Create a singleton for the appender, this appender 
// will be used across all instances of Logger.
var _logAppender = new DefaultLogAppender();

var getLogAppender = function() {
	return _logAppender;
};

var setLogAppender = function(logAppender) {
	_logAppender = logAppender;
};
