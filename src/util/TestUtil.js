
function UnitTest() {
	
	this.tests = new Array();
	this.failures = new Array();
	
	this.addFailure = function(source, message) {
		failures[failures.length] = {
			'source' : source,
			'message' : message
		};
	};
	
	this.registerTest = function(test) {
		tests[tests.length] = test;
	};
	
	this.runTests = function() {
		for (var test in tests) {
			test();
		}
	};
}

UnitTest.assert = function(condition, message) {
	if (condition) return;

	// do something magical here
}

var assert = UnitTest.assert();

assert();
