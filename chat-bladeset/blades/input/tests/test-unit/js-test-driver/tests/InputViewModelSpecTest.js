var jas = require('jasmine');
var InputViewModel = require( 'modularapp/chat/input/InputViewModel');
var userService = ServiceRegistry.getService( 'user.service' );
var User = require( 'userservice/User' );

describe("The InputViewModel", function() {
  it("Requests a user from the UserService when instantiated", function() {
	  spyOn(userService, "getCurrentUser");
	  var vm = new InputViewModel();
	  expect(userService.getCurrentUser).toHaveBeenCalledWith(vm);
  });
  
  it("Becomes enabled when user details are returned from server", function() {
	  var vm = new InputViewModel();
	  expect(vm.enabled()).toBe(false);
	  userService.setCurrentUserFromServer(new User("Bob"));
	  expect(vm.enabled()).toBe(true);
  });
  
});