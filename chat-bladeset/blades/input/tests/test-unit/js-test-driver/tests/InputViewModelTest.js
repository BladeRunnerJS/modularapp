var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );

InputViewModelTest.prototype.testSomething = function() {
  var model = new InputViewModel();
  assertEquals( 'Hello World!', model.message() );
};
