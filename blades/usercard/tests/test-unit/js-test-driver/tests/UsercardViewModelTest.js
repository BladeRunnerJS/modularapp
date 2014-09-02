var UsercardViewModelTest = TestCase( 'UsercardViewModelTest' );

var UsercardViewModel = require( 'modularapp/chat/usercard/UsercardViewModel' );

UsercardViewModelTest.prototype.testCardShownDefaultsToFalse = function() {
  var model = new UsercardViewModel();
  assertFalse( model.cardShown() );
};
