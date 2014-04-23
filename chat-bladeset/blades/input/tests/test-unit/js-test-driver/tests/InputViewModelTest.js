var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var model = null;

InputViewModelTest.prototype.setUp = function() {
  var user = { userId: 'testUser' };

  // If any tests become Asynchronous this will be required.
  var userService = ServiceRegistry.getService( 'user.service' );
  userService.setCurrentUser( user );

  model = new InputViewModel();

  // For any synchronous tests we can set the user directly
  model.userRetrieved( user );
};

// Note: ServiceRegistry is cleared down for each test by the test runtime.
// So no need to tearDown manually.

InputViewModelTest.prototype.testDefaultMessageIsEmpty = function() {
  assertEquals( '', model.message() );
};

InputViewModelTest.prototype.testEmptyMessageIsInvalid = function() {
  model.message( '' );
  assertFalse( model.buttonClicked() );
};

InputViewModelTest.prototype.testBlankMessageIsInvalid = function() {
  model.message( '         ' );
  assertFalse( model.buttonClicked() );
};

InputViewModelTest.prototype.testMessageWithValidValueIsClearedAfterButtonClicked = function() {
  model.message( 'hello' );
  model.buttonClicked();

  assertEquals( '', model.message() );
};

InputViewModelTest.prototype.testCurrentUserMustBeSetBeforeMessagesCanBeSent = function() {
  var test = function() {
    model.userRetrieved( null );

    model.message( 'hello' );
    model.buttonClicked();
  };

  assertException( test, 'Error' );

};
