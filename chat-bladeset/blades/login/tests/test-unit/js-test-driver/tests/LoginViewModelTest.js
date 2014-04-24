var LoginViewModelTest = TestCase( 'LoginViewModelTest' );

var LoginViewModel = require( 'modularapp/chat/login/LoginViewModel' );

LoginViewModelTest.prototype.testSomething = function() {
  var model = new LoginViewModel();
  assertEquals( 'Hello World!', model.message() );
};
