var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );

InputViewModelTest.prototype.testDefaultMessageIsEmpty = function() {
  var model = new InputViewModel();
  assertEquals( '', model.message() );
};

InputViewModelTest.prototype.testEmptyMessageIsInvalid = function() {
  var model = new InputViewModel();
  model.message( '' );
  assertFalse( model.buttonClicked() );
};

InputViewModelTest.prototype.testBlankMessageIsInvalid = function() {
  var model = new InputViewModel();
  model.message( '         ' );
  assertFalse( model.buttonClicked() );
};

InputViewModelTest.prototype.testMessageWithValidValueIsClearedAfterButtonClicked = function() {
  var model = new InputViewModel();
  model.message( 'hello' );
  model.buttonClicked();

  assertEquals( '', model.message() );
};
