'use strict';

var br = require( 'br/Core' );

var UserService = require( './UserService' );
var GetUserListener = require( './GetUserListener' );
var GetUserErrorCodes = require( './GetUserErrorCodes' );
var GitHubUserFetcher = require( './GitHubUserFetcher' );
var User = require( './User' );

function FakeUserService() {
  this._users = {};
  this._currentUserId = null;

  this._userDataFetcher = null;
}
br.implement( FakeUserService, UserService );

// Helper functions: used for development and testing.

/**
 * Reset state e.g. list of users and current user.
 */
FakeUserService.prototype.reset = function() {
  this._users = {};
  this._currentUser = null;
  this._userDataFetcher = null;
};

/**
 * Instructs the User service to retrieve data from a provider.
 *
 * @param {string} provider - if the value is 'github' it will get the data from
 *      GitHub. Any other value will result in no fetcher being used and fake
 *      user data being returned for any {@see getUser} request.
 * @param {object} options - a list of options that any fetcher may take
 */
FakeUserService.prototype.setUserDataFetcher = function( provider, options ) {
  options = options || {};

  if( provider === 'github' ) {
    this._userDataFetcher = new GitHubUserFetcher( options );
  }
  else if( provider === 'failing' ) {

    var service = this;
    this._userDataFetcher = {
      count: 0,
      resetAt: options.count,
      getUser: function( userId, listener ) {
        ++this.count;
        var shouldReset = ( this.count === this.resetAt );

        // setTimeout( function() {
          listener.requestFailed();
          if( shouldReset ) {
            service._userDataFetcher = null;
          }
        // }, 0 );

      }
    };

  }
  else {
    this._userDataFetcher = null;
  }
};

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
    asyncUserRetrievalFailed( listener,
                         GetUserErrorCodes.NOT_FOUND,
                         'User data for user with userId ' + this._currentUserId + ' not found'
                       );
  }
  else {
    this.getUser( this._currentUserId, listener );
  }
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
    throw new Error( 'listener must fulfil the GetUserListener contract' );
  }

  var user = this._users[ userId ];

  if( user ) {
    this._getUserData( user, listener );
  }
  else {
    asyncUserRetrievalFailed( listener,
                         GetUserErrorCodes.NOT_FOUND,
                         'User with userId ' + userId + ' not found' );
  }

};

/**
 * @private
 */
FakeUserService.prototype._getUserData = function( user, listener ) {

  if( this._userDataFetcher ) {

    this._userDataFetcher.getUser( user.userId, {
      requestSucceeded: function( response ) {
        user.data = response;
        listener.userRetrieved( user );
      },
      requestFailed: function() {
        userRetrievalFailed( listener,
                             GetUserErrorCodes.NOT_FOUND,
                             'User data for user with userId ' + user.userId + ' not found'
        );
      }
    } );

  }
  else {

    setTimeout( function() {
      user.data = {
        login: user.userId,
        name: 'Guest or Test',
        avatar_url: 'http://www.netanimations.net/Animated-head-bobbing-cat-with-headphones-3.GIF'
      };
      listener.userRetrieved( user );
    }, 0 );

  }
};

// ResponseListener

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

function userRetrievalFailed( listener, code, message ) {
  listener.userRetrievalFailed( code, message );
}

function asyncUserRetrievalFailed( listener, code, message ) {
  setTimeout( function() {
    userRetrievalFailed( listener, code, message );
  }, 0 );
}

module.exports = FakeUserService;
