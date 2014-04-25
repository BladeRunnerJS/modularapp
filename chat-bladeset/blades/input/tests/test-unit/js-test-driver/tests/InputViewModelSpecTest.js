'use strict';

require('jasmine');

var InputViewModel = require( 'modularapp/chat/input/InputViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );
var userService = ServiceRegistry.getService( 'user.service' );
var User = require( 'userservice/User' );

describe("The InputViewModel", function() {
  
	it("Requests a user from the UserService when instantiated", function() {
		spyOn(userService, "getCurrentUser");
		var inputViewModel = new InputViewModel();
		expect(userService.getCurrentUser);
	});

});
