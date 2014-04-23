var FireChatServiceTest = TestCase( 'FireChatServiceTest' );

var FireChatService = require( 'firechat/FireChatService' );

FireChatServiceTest.prototype.testCanCreateInstance = function() {
	var service = new FireChatService();
	assertNotUndefined( service );
};
