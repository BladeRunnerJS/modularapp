var LoginViewModelTest = TestCase( 'LoginViewModelTest' );

var LoginViewModel = require( 'modularapp/chat/login/LoginViewModel' );

LoginViewModelTest.prototype.testCanInstantiateViewModel = function() {
  var model = new LoginViewModel();
  assertNotUndefined( model );
};
