var MessagesItemViewModelTest = TestCase( 'MessagesItemViewModelTest' );

var MessagesItemViewModel = require( 'modularapp/chat/messages/MessageItemViewModel' );
var moment = require( 'momentjs' );

MessagesItemViewModelTest.prototype.testObservablesAreInitialised = function() {
  var data = { userId: 'testUserId', text: 'testUserText', timestamp: new Date() };
  var model = new MessagesItemViewModel( data );

  assertEquals( data.userId, model.userId() );
  assertEquals( data.text, model.text() );
  assertTrue( model.timestamp() !== null );
};

MessagesItemViewModelTest.prototype.testTimestampIsFormatted = function() {
  var data = { userId: 'testUserId', text: 'testUserText', timestamp: new Date() };
  var model = new MessagesItemViewModel( data );

  var expectedFormattedDate = moment( data.timestamp ).format('h:mm:ss a');
  assertEquals( expectedFormattedDate, model.timestamp() );
};
