var LocalChatServiceTest = TestCase("LocalChatServiceTest");

var LocalChatService = require( 'chatservice/LocalChatService' );
var ChatMessage = require( 'chatservice/ChatMessage' );

LocalChatServiceTest.prototype.testCreatingDummyChatServiceInstance = function() {
	var service = new LocalChatService();
	assertTrue( service !== undefined );
};

LocalChatServiceTest.prototype.testNewMessageEventIsTriggeredOnSendMessage = function() {
	var service = new LocalChatService();
	var triggered = false;
	service.on( 'new-message', function() {
		triggered = true;
	} );

	service.sendMessage( new ChatMessage( 'testId', "test message", new Date() ) );
	assertTrue( triggered );
};

LocalChatServiceTest.prototype.testMessageObjectIsPassedWhenNewMessageIsTriggered = function() {
	var service = new LocalChatService();
	var triggeredMessage = null;
	service.on( 'new-message', function( data ) {
		triggeredMessage = data;
	} );

	var message = new ChatMessage( 'testId', "test message", new Date() );
	service.sendMessage( message );
	assertEquals( message, triggeredMessage );
};
