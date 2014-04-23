var LocalChatServiceTest = TestCase( 'LocalChatServiceTest' );

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


var LocalChatServiceAsyncTest = AsyncTestCase('LocalChatServiceAsyncTest');

LocalChatServiceAsyncTest.prototype.testCanGetMessages = function( queue ) {
	var service = new LocalChatService();
	var message1 = { userId: 'leggetter', text: 'hello', timestamp: new Date() };
	var message2 = { userId: 'andyberry88', text: 'Yo!', timestamp: new Date() };
	service.sendMessage( message1 );
	service.sendMessage( message2 );

	queue.call( 'Step 1: make request for messges', function( callbacks ) {

		var messagesRetrievedCallback = callbacks.add( function( messages ) {
			assertEquals( message1, messages[ 0 ] );
			assertEquals( message2, messages[ 1 ] );
		} );

		service.getMessages( {
			messagesRetrieved: messagesRetrievedCallback
		} );

	} );

};
