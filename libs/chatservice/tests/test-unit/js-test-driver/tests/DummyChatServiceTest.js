var DummyChatServiceTest = TestCase("DummyChatServiceTest");

var DummyChatService = require( 'modularapp/chatservice/DummyChatService' );

DummyChatServiceTest.prototype.testCreatingDummyChatServiceInstance = function() {
	var service = new DummyChatService();
	assertTrue( service !== undefined );
};
