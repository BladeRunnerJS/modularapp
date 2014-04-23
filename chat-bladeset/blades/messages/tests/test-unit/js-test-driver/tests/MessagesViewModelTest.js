var MessagesViewModelTest = TestCase( 'MessagesViewModelTest' );

var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel' );

MessagesViewModelTest.prototype.testAddingAMessageIncreasesMessageCountByOne = function() {
  var model = new MessagesViewModel();
  var initialMessageCount = model.messages().length;
  var expectedMessageCount = initialMessageCount + 1;

  model._addMessage( { userId: 'test', text: 'test text', timestamp: new Date() } );
  assertEquals( expectedMessageCount, model.messages().length );
};

// TODO: implement.
// Note: new-message is only bound after initial set of messages are retrieved.
// MessagesViewModelTest.prototype.testModelAddsNewMessageToViewOnNewMessageEvent = function() {
// };
