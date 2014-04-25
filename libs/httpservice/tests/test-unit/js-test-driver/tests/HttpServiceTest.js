'use strict';

var HTTPServiceTest = TestCase( 'HTTPServiceTest' );

var Service = require( 'httpservice/Service' );

HTTPServiceTest.prototype.testCanCreateInstance = function() {
	var service = new Service();
};
