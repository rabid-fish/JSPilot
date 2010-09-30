
function UnitTest(selectorMessages, selectorProgress) {
	
	this.tests = null;
	this.testNames = null;
	this.testIndex = 0;
	this.testsRun = 0;
	
	this.failures = null;
	this.selectorMessages = selectorMessages;
	this.selectorProgress = selectorProgress;
	
	this.run = function() {
		this.findTests(window);
		this.runTests();
	};
	
	this.findTests = function(source) {
	
		this.tests = [];
		this.testNames = [];
		
		for (var f in source) {
			if (f && 
				f.indexOf('_') != -0 &&
				f.lastIndexOf('Test') == (f.length - 'Test'.length) && 
				f != 'UnitTest') {
				
				if (typeof source[f] === 'function') {
					this.testNames.push(f);
					this.tests.push(source[f]);
				}
			}
		}
	};
	
	this.runTests = function() {
		
		this.testIndex = 0;
		this.testsRun = 0;
		this.failures = [];
		
		if (this.selectorMessages) {
			$(this.selectorMessages).empty();
		}
		
		for (var i = 0; i < this.tests.length; i++) {
			if (this.selectorMessages) {
				$(this.selectorMessages).append('<li>running ' + this.testNames[i] + '</li>')
			}
			this.testIndex = i;
//			eval(this.tests[this.testIndex] + '()');
			this.tests[this.testIndex]();
			
			this.updateProgress();
		}
	};
	
	this.updateProgress = function() {
		
		if (!this.selectorProgress) return;
		
		$(this.selectorProgress).removeClass('testSuccess').removeClass('testFailure');
		
		if (this.failures.length > 0) {
			$(this.selectorProgress).addClass('testFailure');
		} else {
			$(this.selectorProgress).addClass('testSuccess');
		}
	}
	
	this.test = function(condition, message) {
		this.testsRun++;
		if (condition) return;
		
		var source = this.testNames[this.testIndex];
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

// Create a singleton
var runTests = function(selectorMessages, selectorProgress) {
	_unitTest = new UnitTest(selectorMessages, selectorProgress);
	_unitTest.run();
};

var test = function(condition, message) {
	_unitTest.test(condition, message);
};
