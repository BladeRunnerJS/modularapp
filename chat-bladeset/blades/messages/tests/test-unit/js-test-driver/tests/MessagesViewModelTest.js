var MessagesViewModelTest = TestCase( 'MessagesViewModelTest' );

var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel' );

MessagesViewModelTest.prototype.testSomething = function() {
  var model = new MessagesViewModel();
  assertEquals( 'Hello World!', model.message() );
};
