function LogUtilTest() {
	
	var appender = getLogAppender();
	
	try {
		setLogAppender(null);
		var logger = new Logger();
		
		logger.setLevel(LogLevel.trace);
		logger.log(LogLevel.trace, 'Test trace');
		logger.log(LogLevel.debug, 'Test debug');
		logger.log(LogLevel.info, 'Test info');
		logger.log(LogLevel.warn, 'Test warn');
		test(logger.getMessageCount() == 4, 'Logger captured all messages');
		
		logger.clearMessages();
		test(logger.getMessageCount() == 0, 'Logger cleared all messages');
		
		logger.setLevel(LogLevel.warn);
		logger.log(LogLevel.trace, 'Test trace');
		logger.log(LogLevel.debug, 'Test debug');
		logger.log(LogLevel.info, 'Test info');
		logger.log(LogLevel.warn, 'Test warn');
		test(logger.getMessageCount() == 1, 'Logger captured warnings only');
	}
	finally {
		setLogAppender(appender);
	}
}
