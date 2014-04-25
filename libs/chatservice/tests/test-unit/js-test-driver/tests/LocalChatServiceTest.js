var FakeChatServiceTest = TestCase( 'FakeChatServiceTest' );

var FakeChatService = require( 'chatservice/FakeChatService' );
var ChatMessage = require( 'chatservice/ChatMessage' );

FakeChatServiceTest.prototype.testCreatingDummyChatServiceInstance = function() {
	var service = new FakeChatService();
	assertTrue( service !== undefined );
};

FakeChatServiceTest.prototype.testNewMessageEventIsTriggeredOnSendMessage = function() {
	var service = new FakeChatService();
	var triggered = false;
	service.on( 'new-message', function() {
		triggered = true;
	} );

	service.sendMessage( new ChatMessage( 'testId', "test message", new Date() ) );
	assertTrue( triggered );
};

FakeChatServiceTest.prototype.testMessageObjectIsPassedWhenNewMessageIsTriggered = function() {
	var service = new FakeChatService();
	var triggeredMessage = null;
	service.on( 'new-message', function( data ) {
		triggeredMessage = data;
	} );

	var message = new ChatMessage( 'testId', "test message", new Date() );
	service.sendMessage( message );
	assertEquals( message, triggeredMessage );
};


var FakeChatServiceAsyncTest = AsyncTestCase('FakeChatServiceAsyncTest');

FakeChatServiceAsyncTest.prototype.testCanGetMessages = function( queue ) {
	var service = new FakeChatService();
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
