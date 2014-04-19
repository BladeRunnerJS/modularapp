var LocalChatServiceTest = TestCase("LocalChatServiceTest");

var LocalChatService = require( 'chatservice/LocalChatService' );

LocalChatServiceTest.prototype.testCreatingDummyChatServiceInstance = function() {
	var service = new LocalChatService();
	assertTrue( service !== undefined );
};
