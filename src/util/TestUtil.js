/*
 * Simple testing facility. 
 * To use it, create a function that ends in the name 'Test'
 * (for example: FooTest), then call to the global function 
 * test() with a condition (for example: test(1 == 1)).
 * Your function (FooTest) will automatically get picked up
 * and run by the this facility.
 */

function Tester(selectorMessages, selectorProgress) {
	
	var tests = null;
	var testNames = null;
	var testIndex = 0;
	var testsRun = 0;
	
	var failures = null;
	var selectorMessages = selectorMessages;
	var selectorProgress = selectorProgress;
	
	this.run = function() {
		this.findTests(window);
		this.runTests();
	};
	
	this.findTests = function(source) {
	
		tests = [];
		testNames = [];
		
		for (var f in source) {
			if (f && 
				f.indexOf('_') != -0 &&
				f.lastIndexOf('Test') == (f.length - 'Test'.length)) {
				
				if (typeof source[f] === 'function') {
					testNames.push(f);
					tests.push(source[f]);
				}
			}
		}
	};
	
	this.runTests = function() {
		
		testIndex = 0;
		testsRun = 0;
		failures = [];
		
		if (selectorMessages) {
			$(selectorMessages).empty();
		}
		
		for (var i = 0; i < tests.length; i++) {
			if (selectorMessages) {
				$(selectorMessages).append('<li>running ' + testNames[i] + '</li>')
			}
			testIndex = i;
//			eval(tests[testIndex] + '()');
			tests[testIndex]();
			
			this.updateProgress();
		}
	};
	
	this.updateProgress = function() {
		
		if (!selectorProgress) return;
		
		$(selectorProgress).removeClass('testSuccess').removeClass('testFailure');
		
		if (failures.length > 0) {
			$(selectorProgress).addClass('testFailure');
		} else {
			$(selectorProgress).addClass('testSuccess');
		}
	}
	
	this.countOfTests = function() {
		return tests.length;
	};
	
	this.countOfFailures = function() {
		return failures.length;
	};
	
	this.test = function(condition, message) {
		testsRun++;
		if (condition) return;
		
		var source = testNames[testIndex];
		this.addFailure(source, message);
	};
	
	this.addFailure = function(source, message) {
		failures[failures.length] = {
			'source' : source,
			'message' : message
		};
		
		if (selectorMessages) {
			$(selectorMessages).append('<li>failure testing "' + message + '"</li>')
		}
	};
};

// Create a singleton
var _tester;

var runTests = function(selectorMessages, selectorProgress) {
	_tester = new Tester(selectorMessages, selectorProgress);
	_tester.run();
};

var test = function(condition, message) {
	_tester.test(condition, message);
};
