'use strict';

var br = require( 'br/Core' );
var UserService = require( './UserService' );
var GetUserListener = require( './GetUserListener' );
var GetUserErrorCodes = require( './GetUserErrorCodes' );
var User = require( './User' );

function FakeUserService() {
  this._users = {};
  this._listener = null;
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
FakeUserService.prototype.getCurrentUser = function( listener ) {
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

  // fake async
  var self = this;
  setTimeout( function() {
    if( user ) {
      listener.userRetrieved( user );
    }
    else {
      listener.userRetrievalFailed(
        GetUserErrorCodes.NOT_FOUND,
        'User with userId ' + userId + ' not found'
      );
    }
  }, 0 );
};

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
};

// Private non-instance functions

function checkUser( user ) {
  if( br.fulfills( user, User.prototype ) === false ) {
    var expectedContract = JSON.stringify( User, null, 2 );
    throw new Error( 'The user must fulfill the contract of a User: ' + expectedContract );
  }
}

module.exports = FakeUserService;
