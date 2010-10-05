/*
 * Facilities for reusable components that are small and don't deserve their own file.
 */

function HtmlMessageAppender(selector, maxMessageDisplay) {
	
	var messages = new Array();
	var messagesIndex = -1;
	var messagesSelector = $(selector);
	
	var MESSAGE_MAX_DISPLAY = maxMessageDisplay ? maxMessageDisplay : 50;
	
	this.clear = function() {
		messages = new Array();
	};
	
	this.append = function(message) {
		
		messagesIndex++;
		if (messagesIndex >= MESSAGE_MAX_DISPLAY) {
			messagesIndex = 0;
		}
		
		messages[messagesIndex] = message;
	};
	
	this.getMessageCount = function() {
		return messages.length;
	};
	
	this.getDisplayHtml = function() {
		
		var buffer = '';
		
		var displayIndex = 0;
		if (messages.length == MESSAGE_MAX_DISPLAY && messagesIndex < (MESSAGE_MAX_DISPLAY - 1)) {
			displayIndex = messagesIndex + 1;
		}
		
		for (var i = 0; i < messages.length; i++) {

			buffer += '<li>' + messages[displayIndex] + '</li>\n';
			
			displayIndex++;
			if (displayIndex >= MESSAGE_MAX_DISPLAY) {
				// wrap the message display around the end of the array
				displayIndex = 0;
			}
		}
		
		buffer = '<ul>' + buffer + '</ul>';
		return buffer;
	};
	
	this.draw = function() {
		if (messagesSelector.length == 0) return;
		messagesSelector.html(this.getDisplayHtml());
	};
}
