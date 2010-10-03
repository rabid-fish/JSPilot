// Normally I'd stick this guy *inside* TesterTest,
// but we get some extra funky recursion going on if
// we do, so keep it external, here.
function TesterMock(tester) {
	
	var parentTester = tester;
	
	this.Mock1Test = function() {
		this.localProperty = "local test property";
		this.localFunction = function() { alert("local test function"); };
		parentTester.test(false, "record this a");
		parentTester.test(false, "record this b");
		parentTester.test(false, "record this c");
	}
	
	this.Mock2Test = function() {
		this.localProperty = "local test property";
		this.localFunction = function() { alert("local test function"); };
		parentTester.test(true, "don't record this a");
		parentTester.test(true, "don't record this b");
		parentTester.test(true, "don't record this c");
	}
}

function TesterTest() {
	
	var tester = new Tester();
	var mock = new TesterMock(tester);
	
	tester.findTests(mock);
	test(tester.countOfTests() == 2);
	
	tester.runTests();
	test(tester.countOfFailures() == 3);
}
