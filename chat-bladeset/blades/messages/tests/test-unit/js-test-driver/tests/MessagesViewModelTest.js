var MessagesViewModelTest = TestCase( 'MessagesViewModelTest' );

var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel' );

MessagesViewModelTest.prototype.testAddingAMessageIncreasesMessageCountByOne = function() {
  var model = new MessagesViewModel();
  var expectedMessageCount = 1;

  model.addMessage( { userId: 'test', text: 'test text', timestamp: new Date() } );
  assertEquals( expectedMessageCount, model.messages().length );
};

// TODO: implement.
// Note: new-message is only bound after initial set of messages are retrieved.
// MessagesViewModelTest.prototype.testModelAddsNewMessageToViewOnNewMessageEvent = function() {
// };
