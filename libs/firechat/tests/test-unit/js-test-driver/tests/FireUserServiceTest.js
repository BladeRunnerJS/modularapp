var FireUserServiceTest = TestCase( 'FireUserServiceTest' );

var FireUserService = require( 'firechat/FireUserService' );

FireUserService.prototype.testCanCreateInstance = function() {
  var service = new FireUserService();
  assertNotUndefined( service );
};
