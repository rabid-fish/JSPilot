
function HtmlMessageAppenderTest() {
	
	var appender = new HtmlMessageAppender(null, 2);
	
	test(appender.getMessageCount() == 0, 'messages array starts empty');
	
	appender.append('test1');
	appender.append('test2');
	test(appender.getMessageCount() == 2, 'messages array has two values');
	
	appender.append('test3');
	test(appender.getMessageCount() == 2, 'messages array maxes at two values');
	test(appender.getDisplayHtml().indexOf('test3') > -1, 'display html contains most recent message');
	
	appender.clear();
	test(appender.getMessageCount() == 0, 'messages array can be cleared');
}