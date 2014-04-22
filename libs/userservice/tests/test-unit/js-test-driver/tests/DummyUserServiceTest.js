var DummyUserServiceTest = TestCase( 'DummyUserServiceTest' );

var DummyUserService = require( 'userservice/DummyUserService' );
var User = require( 'userservice/User' );

DummyUserServiceTest.prototype.testInstanceCanBeCreated = function() {
	var service = new DummyUserService();
	assertTrue( service !== undefined );
};

DummyUserServiceTest.prototype.testUserCanBeAdded = function() {
	var service = new DummyUserService();
	var user = new User( "testUser" );

	service.addUser( user );
};

DummyUserServiceTest.prototype.testObjectLiteralUserCanBeAdded = function() {
	var service = new DummyUserService();
	var user = {
		userId: "testUser"
	};
	service.addUser( user );
};

DummyUserServiceTest.prototype.testObjectLiteralUnFulfilledUserCannotBeAdded = function() {
	var test = function() {
		var service = new DummyUserService();
		var user = {};
		service.addUser( user );
	};

	assertException( test, 'Error' );
};

DummyUserServiceTest.prototype.testUserCannotBeAddedTwice = function() {
	var test = function() {
		var service = new DummyUserService();
		var user = new User( "testUser" );
		service.addUser( user );
		service.addUser( user );
	};

	assertException( test, 'Error' );
};

var DummyUserServiceAsyncTest = AsyncTestCase('DummyUserServiceAsyncTest');

DummyUserServiceAsyncTest.prototype.testCanSetAndGetCurrentUser = function( queue ) {
	var service = new DummyUserService();
	var expectedUser = new User( "testUser" );

	service.setCurrentUser( expectedUser );

	queue.call( 'Step 1: make request for current user', function( callbacks ) {

		var userRetrievedCallback = callbacks.add( function( user ) {
			assertEquals( expectedUser, user );
		} );

		service.getCurrentUser( {
			userRetrieved: userRetrievedCallback
		} );

	} );

};


DummyUserServiceAsyncTest.prototype.testCanAddAndGetUsers = function( queue ) {
	var service = new DummyUserService();
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
