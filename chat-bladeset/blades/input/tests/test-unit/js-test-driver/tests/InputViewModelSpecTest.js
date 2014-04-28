'use strict';

require('jasmine');

var InputViewModel = require( 'modularapp/chat/input/InputViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );
var userService = ServiceRegistry.getService( 'user.service' );
var chatService = ServiceRegistry.getService( 'chat.service' );
var User = require( 'userservice/User' );

describe("The InputViewModel", function() {
  
	it("Requests a user from the UserService when instantiated", function() {
		spyOn(userService, "getCurrentUser");
		var inputViewModel = new InputViewModel();
		expect(userService.getCurrentUser).toHaveBeenCalled();
	});
	
	it("Sends a message to the chat service when the send button is clicked", function() {
		spyOn(chatService, "sendMessage");
		userService.setCurrentUser(new User("Bob"));
		var ivm = new InputViewModel();
		ivm.message("Hello World");
		ivm.buttonClicked();
		expect(chatService.sendMessage).toHaveBeenCalled();
	});
});
