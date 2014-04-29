var FakeUserServiceTest = TestCase( 'FakeUserServiceTest' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var FakeUserService = require( 'userservice/FakeUserService' );
var User = require( 'userservice/User' );
var GetUserErrorCodes = require( 'userservice/GetUserErrorCodes' );

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

FakeUserServiceTest.prototype.testGetUserThrowsErrorIfListenerDoesNotFulfilGetUserListener = function() {
	var test = function() {
		var service = new FakeUserService();
		service.getUser( 'testUserId', {} );
	};

	assertException( test, 'Error' );
};

var FakeUserServiceAsyncTest = AsyncTestCase('FakeUserServiceAsyncTest');

FakeUserServiceAsyncTest.prototype.testCanSetAndGetCurrentUser = function( queue ) {

	var service = new FakeUserService();
	var userId = 'testUser';
	var expectedUser = new User( userId );

	service.setCurrentUser( expectedUser );

	queue.call( 'Step 1: make request for user', function( callbacks ) {

		var userRetrievedCallback = callbacks.add( function( currentUser ) {
			assertTrue( expectedUser === currentUser );
		} );

		service.getCurrentUser( {
			userRetrieved: userRetrievedCallback,
			userRetrievalFailed: function() {}
		} );

	} );

};

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

FakeUserServiceAsyncTest.prototype.testValidUserCanBeRetrieved = function( queue ) {
	var user1Id = 'testUser1';
	var expectedUser1 = new User( user1Id );

	var service = new FakeUserService();
	service.addUser( expectedUser1 );

	queue.call( 'Step 1: make request for user with userId', function( callbacks ) {

		var userRetrievedCallback = callbacks.add( function( user ) {
			assertEquals( expectedUser1, user );
		} );

		service.getUser( user1Id, {
			userRetrieved: userRetrievedCallback,
			userRetrievalFailed: function(){}
		} );

	} );

};

FakeUserServiceAsyncTest.prototype.testFakeServiceCanBeSetToCallUserRetrievalFailed = function() {
	var service = new FakeUserService();
	service.setUserDataFetcher( 'failing', { count: 1 } );

	service.getUser( 'blah-blah-blah', {
		userRetrieved: function(){},
		userRetrievalFailed: function( code, message ) {
			assertEquals( GetUserErrorCodes.NOT_FOUND, code );
		}
	} );
};

FakeUserServiceAsyncTest.prototype.testFakeServiceFetcherFailedCount = function( queue ) {

	var service = new FakeUserService();
	service.setUserDataFetcher( 'failing', { count: 2 } );

	var results = [];
	var testUserId = 'blah';

	var failListener = {
		userRetrieved: function(){},
		userRetrievalFailed: function( code, message ) {
			results.push( 'failed' );
		}
	};

	var passListener = {
		userRetrieved: function(){
			results.push( 'passed' );

			assertEquals( 'failed', results[ 0 ] );
			assertEquals( 'failed', results[ 1 ] );
			assertEquals( 'passed', results[ 2 ] );
			assertEquals( 3, results.length );
		},
		userRetrievalFailed: function( code, message ) {}
	};

	service.getUser( testUserId, failListener );
	service.getUser( testUserId, failListener );
	queue.call( 'wait for async userRetrieved successful callback', function() {
			service.getUser( testUserId, passListener );
	} );

};
