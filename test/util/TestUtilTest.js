// Normally I'd stick this guy *inside* UnitTestTest,
// but we get some extra funky recursion going on if
// we do, so keep it external, here.
function UnitTestMock(unitTest) {
	
	var parentUnitTest = unitTest;
	
	this.Mock1Test = function() {
		this.localProperty = "local test property";
		this.localFunction = function() { alert("local test function"); };
		parentUnitTest.test(false, "record this a");
		parentUnitTest.test(false, "record this b");
		parentUnitTest.test(false, "record this c");
	}
	
	this.Mock2Test = function() {
		this.localProperty = "local test property";
		this.localFunction = function() { alert("local test function"); };
		parentUnitTest.test(true, "don't record this a");
		parentUnitTest.test(true, "don't record this b");
		parentUnitTest.test(true, "don't record this c");
	}
}

function UnitTestTest() {
	
	var unitTest = new UnitTest();
	var mock = new UnitTestMock(unitTest);
	
	unitTest.findTests(mock);
	test(unitTest.tests.length == 2);
	
	unitTest.runTests();
	test(unitTest.failures.length == 3);
}
