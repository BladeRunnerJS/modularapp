'use strict';

var br = require( 'br/Core' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var UserService = require( './UserService' );
var GetUserListener = require( './GetUserListener' );
var GetUserErrorCodes = require( './GetUserErrorCodes' );
var GitHubUserFetcher = require( './GitHubUserFetcher' );
var User = require( './User' );

function FakeUserService() {
  this._users = {};

  this._gitHubUserFetcher = null;
  if( ServiceRegistry.isServiceRegistered( 'github.userfetcher' ) ) {
    this._gitHubUserFetcher = ServiceRegistry.getService( 'github.userfetcher' )
  }
  else {
    this._gitHubUserFetcher = new GitHubUserFetcher();
  }
}
br.implement( FakeUserService, UserService );

// UserService definitions

/**
 * @see {UserService.setCurrentUser}
 */
FakeUserService.prototype.setCurrentUser = function( user ) {
  checkUser( user );

  this.addUser( user );

  this._currentUserId = user.userId;
};

/**
 * @see {UserService.getCurrentUser}
 */
FakeUserService.prototype.getCurrentUser = function() {
  if( !this._currentUserId ) {
    throw new Error( 'the currentUser has not been set' );
  }

  var user = this._users[ this._currentUserId ];
  return user;
};

/**
 * @see {UserService.getUsers}
 */
FakeUserService.prototype.getUsers = function( listener ) {
  // fake async
  var self = this;
  setTimeout( function() {
    var users = self._users;
    listener.usersRetrieved( users );
  }, 0 );
};

/**
 * @see {UserService.getUser}
 */
FakeUserService.prototype.getUser = function( userId, listener ) {

  if( !br.fulfills( listener, GetUserListener.prototype ) ) {
    throw new Error( 'listener must fulfil the GetUserListener contract: ' +
                       JSON.stringify( GetUserListener)
                    );
  }

  var user = this._users[ userId ];

  if( user ) {
    this._getUserData( user, listener );
  }
  else {
    // fake async
    setTimeout( function() {
      listener.userRetrievalFailed(
        GetUserErrorCodes.NOT_FOUND,
        'User with userId ' + userId + ' not found'
      );
    }, 0 );
  }

};

/**
 * @private
 */
FakeUserService.prototype._getUserData = function( user, listener ) {

  this._gitHubUserFetcher.getUser( user.userId, {
    requestSucceeded: function( response ) {
      user.data = response;
      listener.userRetrieved( user );
    },
    requestFailed: function() {
      listener.userRetrievalFailed(
        GetUserErrorCodes.NOT_FOUND,
        'User data for user with userId ' + userId + ' not found'
      );
    }
  } );

}

// Helper functions: used for development and testing.

/**
 * Helper function.
 *
 * Add a user to the current session. This indicates another user
 * that is using the application in another location.
 *
 * @param {userservice.User} user
 */
FakeUserService.prototype.addUser = function( user ) {
  checkUser( user );

  if( this._users[ user.userId ] !== undefined ) {
    throw new Error( 'A User with a userId of "' + user.userId + '" is already present.' );
  }

  this._users[ user.userId ] = user;

  this._gitHubUserFetcher.getUser( user.userId, this );
};

/**
 * Has the user been added to the user service.
 *
 * @param {string} userId the ID of the user to check.
 *
 * @returns {boolean} true or false
 */
FakeUserService.prototype.userExists = function( userId ) {
  return ( this._users[ userId ] !== undefined );
};

/**
 * @see {httpservice.ResponseListener.requestSucceeded}
 */
FakeUserService.prototype.requestSucceeded = function( response ) {
  // Example response: https://api.github.com/users/leggetter
  this._users[ response.login ].data = response;
};

/**
* @see {httpservice.ResponseListener.requestFailed}
*/
FakeUserService.prototype.requestFailed = function( error ) {
  // Unexpected, so error.
  throw new Error( error.toString() );
};

// Private non-instance functions

function checkUser( user ) {
  if( br.fulfills( user, User.prototype ) === false ) {
    var expectedContract = JSON.stringify( User, null, 2 );
    throw new Error( 'The user must fulfill the contract of a User: ' + expectedContract );
  }
}

module.exports = FakeUserService;
