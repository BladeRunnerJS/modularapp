var HeaderViewModelTest = TestCase( 'HeaderViewModelTest' );

var HeaderViewModel = require( 'modularapp/chat/header/HeaderViewModel' );

HeaderViewModelTest.prototype.testSomething = function() {
  var model = new HeaderViewModel();
  assertEquals( 'Hello World!', model.message() );
};
