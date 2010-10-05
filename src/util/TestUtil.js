/*
 * Simple testing facility. 
 * To use it, create a function that ends in the name 'Test'
 * (for example: FooTest), then call to the global function 
 * test() with a condition (for example: test(1 == 1)).
 * Your function (FooTest) will automatically get picked up
 * and run by the this facility.
 * 
 * To see the appender output and progress bar, you must
 * have elements of id 'testMessages' and 'testProgress',
 * respectively.
 */

function DefaultTestAppender() {
	
	// We'll use composition to make HtmlMessageAppender a parent
	// class until we understand javascript inheritance better.
	var parent = new HtmlMessageAppender('#testMessages', 50);
	
	var hasFailed = false;
	
	this.clear = function() {
		parent.clear();
	}
	
	this.append = function(subtest, condition, message) {
		
		hasFailed |= !condition;
		
		parent.append(getFormattedMessage(subtest, condition, message));
		parent.draw();
		updateProgress();
	};
	
	var getFormattedMessage = function(subtest, condition, message) {
		
		if (!subtest) {
			return '<span class="test">Running ' + message + '</span>';
		}
		else if (condition) {
			return '<span class="subtest">success: "' + message + '"</span>';
		}
		else {
			return '<span class="subtest fail">failure: "' + message + '"</span>';
		}
	};
	
	var updateProgress = function() {
		
		$('#testProgress').each(function() {
			$(this).removeClass('testSuccess').removeClass('testFailure');
			
			if (hasFailed > 0) {
				$(this).addClass('testFailure');
			} else {
				$(this).addClass('testSuccess');
			}
		});
	}
}

function Tester(appender) {
	
	var tests = null;
	var testsNames = null;
	var testsIndex = 0;
	var testsRun = 0;
	var testsFailed = null;
	
	var appender = appender;
	
	this.run = function() {
		this.findTests(window);
		this.runTests();
	};
	
	this.findTests = function(source) {
	
		tests = [];
		testsNames = [];
		
		for (var f in source) {
			if (f && 
				f.indexOf('_') != -0 &&
				f.lastIndexOf('Test') == (f.length - 'Test'.length)) {
				
				if (typeof source[f] === 'function') {
					testsNames.push(f);
					tests.push(source[f]);
				}
			}
		}
	};
	
	this.runTests = function() {
		
		testsIndex = 0;
		testsRun = 0;
		testsFailed = [];
		
		appender.clear();
		
		for (var i = 0; i < tests.length; i++) {
			appender.append(false, true, testsNames[i]);
			
			testsIndex = i;
			tests[testsIndex]();
		}
	};
	
	this.test = function(condition, message) {
		
		testsRun++;
		
		if (condition) {
			appender.append(true, true, message);
		}
		else {
			var source = testsNames[testsIndex];
			addFailure(source, message);
			appender.append(true, false, message);
		}
	};
	
	var addFailure = function(source, message) {
		testsFailed[testsFailed.length] = {
			'source' : source,
			'message' : message
		};
	};
	
	this.getCountOfTests = function() {
		return tests.length;
	};
	
	this.getCountOfFailures = function() {
		return testsFailed.length;
	};
};

// An instance of Tester is run as a singleton
var _tester;

var runTests = function() {
	var appender = new DefaultTestAppender();
	_tester = new Tester(appender);
	_tester.run();
};

var test = function(condition, message) {
	_tester.test(condition, message);
};
