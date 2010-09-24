
function UnitTest(selectorMessages, selectorProgress) {
	
	this.tests = null;
	this.failures = null;
	this.selectorMessages = selectorMessages;
	this.selectorProgress = selectorProgress;
	this.testCount = 0;
	
	this.run = function() {

		this.tests = new Array();
		this.failures = new Array();
	
		this.findTests();
		this.runTests();
	};
	
	this.findTests = function() {
	
		this.tests = [];
		
		for (var f in window) {
			if (f && 
				f.indexOf('Test') == (f.length - 'Test'.length) && 
				f != 'UnitTest') {
				
				if (typeof window[f] === 'function') {
					this.tests.push(f);
				}
			}
		}
	};
	
	this.runTests = function() {
		
		if (this.selectorMessages) {
			$(this.selectorMessages).empty();
		}
		
		for (var i = 0; i < this.tests.length; i++) {
			if (this.selectorMessages) {
				$(this.selectorMessages).append('<li>running ' + this.tests[i] + '</li>')
			}
			eval(this.tests[i] + '()');
			
			this.updateProgress();
		}
	};
	
	this.updateProgress = function() {
		
		$(this.selectorProgress).removeClass('testSuccess').removeClass('testFailure');
		
		if (this.failures.length > 0) {
			$(this.selectorProgress).addClass('testFailure');
		} else {
			$(this.selectorProgress).addClass('testSuccess');
		}
	}
	
	this.test = function(source, condition, message) {
		this.testCount++;
		if (condition) return;
		this.addFailure(source, message);
	};
	
	this.addFailure = function(source, message) {
		this.failures[this.failures.length] = {
			'source' : source,
			'message' : message
		};
	};
};

var _unitTest;

//Create some globally scoped functions
var runTests = function(selectorMessages, selectorProgress) {
	_unitTest = new UnitTest(selectorMessages, selectorProgress);
	_unitTest.run();
};

var test = function(condition, message) {
	_unitTest.test(test.caller, condition, message);
};
