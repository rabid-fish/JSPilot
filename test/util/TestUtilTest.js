// Normally I'd stick this guy *inside* TesterTest,
// but we get some extra funky recursion going on if
// we do, so keep it external, here.
function TesterFixture(tester) {
	
	// We need a reference to a non-live copy of Tester so we can call to test() 
	// without hitting singleton instance of Tester and its default appender.
	var parentTester = tester;
	
	this.Mock1Test = function() {
		this.localProperty = 'local test property';
		this.localFunction = function() { alert('local test function'); };
		parentTester.test(false, 'fail test a');
		parentTester.test(false, 'fail test b');
		parentTester.test(false, 'fail test c');
	}
	
	this.Mock2Test = function() {
		this.localProperty = 'local test property';
		this.localFunction = function() { alert('local test function'); };
		parentTester.test(true, 'pass test a');
		parentTester.test(true, 'pass test b');
	}
}

function TesterAppenderMock() {
	this.clear = function(){};
	this.append = function(){};
}

function TesterTest() {
	
	var appender = new TesterAppenderMock();
	var tester = new Tester(appender);
	var fixture = new TesterFixture(tester);

	tester.findTests(fixture);
	test(tester.getCountOfTests() == 2, 'Tester found 2 methods to run from TesterFixture');
	
	tester.runTests();
	test(tester.getCountOfFailures() == 3, 'Tester.test() was called three times with failing conditions');
}
