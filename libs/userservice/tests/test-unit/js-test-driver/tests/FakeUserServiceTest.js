var FakeUserServiceTest = TestCase( 'FakeUserServiceTest' );

var FakeUserService = require( 'userservice/FakeUserService' );
var User = require( 'userservice/User' );

FakeUserServiceTest.prototype.testInstanceCanBeCreated = function() {
	var service = new FakeUserService();
	assertTrue( service !== undefined );
};

FakeUserServiceTest.prototype.testUserCanBeAdded = function() {
	var service = new FakeUserService();
	var user = new User( "testUser" );

	service.addUser( user );
};

FakeUserServiceTest.prototype.testObjectLiteralUserCanBeAdded = function() {
	var service = new FakeUserService();
	var user = {
		userId: "testUser"
	};
	service.addUser( user );
};

FakeUserServiceTest.prototype.testObjectLiteralUnFulfilledUserCannotBeAdded = function() {
	var test = function() {
		var service = new FakeUserService();
		var user = {};
		service.addUser( user );
	};

	assertException( test, 'Error' );
};

FakeUserServiceTest.prototype.testUserCannotBeAddedTwice = function() {
	var test = function() {
		var service = new FakeUserService();
		var user = new User( "testUser" );
		service.addUser( user );
		service.addUser( user );
	};

	assertException( test, 'Error' );
};

FakeUserServiceTest.prototype.testCanSetAndGetCurrentUser = function( queue ) {
	var service = new FakeUserService();
	var expectedUser = new User( "testUser" );

	service.setCurrentUser( expectedUser );

	var currentUser = service.getCurrentUser();
	assertEquals( expectedUser, currentUser );
};

var FakeUserServiceAsyncTest = AsyncTestCase('FakeUserServiceAsyncTest');

FakeUserServiceAsyncTest.prototype.testCanAddAndGetUsers = function( queue ) {
	var service = new FakeUserService();
	var user1Id = 'testUser1';
	var user2Id = 'testUser2';
	var expectedUser1 = new User( user1Id );
	var expectedUser2 = new User( user2Id );

	service.addUser( expectedUser1 );
	service.addUser( expectedUser2 );

	queue.call( 'Step 1: make request for users', function( callbacks ) {

		var usersRetrievedCallback = callbacks.add( function( users ) {
			assertEquals( expectedUser1, users[ user1Id ] );
			assertEquals( expectedUser2, users[ user2Id ] );
		} );

		service.getUsers( {
			usersRetrieved: usersRetrievedCallback
		} );

	} );

};
