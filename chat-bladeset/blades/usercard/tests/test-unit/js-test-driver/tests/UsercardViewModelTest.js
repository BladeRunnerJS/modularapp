var UsercardViewModelTest = TestCase( 'UsercardViewModelTest' );

var UsercardViewModel = require( 'modularapp/chat/usercard/UsercardViewModel' );

UsercardViewModelTest.prototype.testCanCreateInstance = function() {
  var model = new UsercardViewModel();
  assertNotUndefined( model );
};
