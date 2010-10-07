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
	
	var properties = {
		'level' : level ? level : LogLevel.info,
		'messageCount' : 0,
		'appender' : appender ? appender : new DefaultLogAppender()
	};
	
	this.setLevel = function(level) {
		properties.level = level;
	};
	
	this.clearMessages = function() {
		properties.appender.clear();
		properties.messageCount = 0;
	};
	
	this.getMessageCount = function() {
		return properties.messageCount;
	};

	this.log = function(level, message, source) {
		
		if (level < properties.level) {
			return;
		}
		
		properties.messageCount++;
		var source = source ? source : arguments.callee.caller.name;
		properties.appender.append(source, level, message);
	};
}

// Lazy instantiate the default logger and friends, as we will 
// not have access to the DOM until after document.ready.
var _logger = null;
var _logConfig = null;

var getLogger = function() {
	
	if (_logger == null && _logConfig != null) {
		_logger = new Logger(_logConfig.level, _logConfig.appender);
	}
	else if (_logger == null) {
		_logger = new Logger();
	}
	
	return _logger;
};

var setLogConfig = function(args) {
	_logConfig = {
		'level' : args.level ? args.level : null,
		'appender' : args.appender ? args.appender : null
	};
};

// Create 'static' methods for easy access
var trace = function(message){ var source = arguments.callee.caller.name; getLogger().log(LogLevel.trace, message, source); };
var debug = function(message){ var source = arguments.callee.caller.name; getLogger().log(LogLevel.debug, message, source); };
var info  = function(message){ var source = arguments.callee.caller.name; getLogger().log(LogLevel.info, message, source); };
var warn  = function(message){ var source = arguments.callee.caller.name; getLogger().log(LogLevel.warn, message, source); };
