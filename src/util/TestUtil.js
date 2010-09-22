
function UnitTest() {
	
	this.tests = new Array();
	this.failures = new Array();
	
	this.addFailure = function(source, message) {
		failures[failures.length] = {
			'source' : source,
			'message' : message
		};
	};
	
	this.test = function(condition, message) {
		if (condition) return;
		addFailure(test.caller, message);
	}
	
	this.runTests = function(selector) {
		var tests = [];
		
		for (var f in window) {
			if (f && 
				f.indexOf('Test') > 0 && 
				f != 'UnitTest') {
				
				if (typeof window[f] === 'function') {
					alert(f);
					tests.push(f);
				}
			}
		}
		
		$(selector).empty();
		
		for (var i = 0; i < tests.length; i++) {
			$(selector).append('<li>running ' + tests[i] + '</li>')
			eval(test[i] + '()');
		}
		
		alert(this.failures.length)
	};
}

var test = UnitTest.test;
