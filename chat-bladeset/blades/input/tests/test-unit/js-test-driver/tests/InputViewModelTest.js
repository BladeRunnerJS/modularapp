var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var model = null;

InputViewModelTest.prototype.setUp = function() {
  var userService = ServiceRegistry.getService( 'user.service' );

  var user = { userId: 'testUser' };
  // Set in order to stop exceptions from service
  userService.setCurrentUser( user );

  model = new InputViewModel();
  // set in order to all buttonClicked tests to be performed
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

// Tests where the UserService hasn't been set up with a User
var InputViewModelNoUserTest = TestCase( 'InputViewModelNoUserTest' );

InputViewModelNoUserTest.prototype.testCurrentUserMustBeSetBeforeMessagesCanBeSent = function() {
  var test = function() {
    var noUserModel = new InputViewModel();

    noUserModel.message( 'hello' );
    noUserModel.buttonClicked();
  };

  assertException( test, 'Error' );

};
