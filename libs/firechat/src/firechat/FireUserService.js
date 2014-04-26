'user strict';

var br = require( 'br/Core' );
var Firebase = require( 'firebase' );
var emitr = require( 'emitr' );

var UserService = require( 'userservice/UserService' );
var User = require( 'userservice/User' );
var GetUserListener = require( 'userservice/GetUserListener' );
var GitHubUserFetcher = require( 'userservice/GitHubUserFetcher' );

var ChatService = require( 'chatservice/ChatService' );

var Presence = require( './Presence' );
var Log = require( 'fell' ).Log;

var FirebaseService = require( 'firebaseservice/FirebaseService' );

function FireUserService() {
  this._firebase = null;
  this._presence = null;

  this._gitHubUserFetcher = new GitHubUserFetcher();

  this._currentUser = null;
  this._users = {};
}
br.implement( FireUserService, UserService );
emitr.mixInto( FireUserService );

// UserService definitions

/**
 * @see {userservice.UserService.setCurrentUser}
 */
FireUserService.prototype.setCurrentUser = function( user ) {
  if( br.fulfills( user, User.prototype ) === false ) {
    throw new Error( 'user must fulfill the User contract: ' + JSON.stringify( User ) );
  }

  this._currentUser = user;

  this._firebase = FirebaseService.getFirebase();
  this._presence = new Presence( this._firebase, user.userId, {}, this );
};

/**
 * @see {userservice.UserService.getCurrentUser}
 */
FireUserService.prototype.getCurrentUser = function( listener ) {
  if( this._currentUser === null ) {
    throw new Error( 'currentUser has not been set.' );
  }

  return this._currentUser;
};

/**
 * @see {userservice.UserService.getUsers}
 */
FireUserService.prototype.getUsers = function( listener ) {
  setTimeout( function() {
    listener.usersRetrieved( this._users );
  }, 0 );
};

/**
 * @see {userservice.UserService.getUser}
 */
FireUserService.prototype.getUser = function( userId, listener ) {
  if( !br.fulfills( listener, GetUserListener.prototype ) ) {
    throw new Error( 'listener must fulfil the GetUserListener contract: ' +
                       JSON.stringify( GetUserListener )
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
FireUserService.prototype._getUserData = function( user, listener ) {

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

// Presence Listener definitions

FireUserService.prototype.userJoined = function( user ) {
  if( this._users[ user.userId ] !== undefined ) {
    Log.warn( 'attempt to add user with userId {0}. That user already exists!', user.userId );
    return;
  }

  this._users[ user.userId ] = user;
};

FireUserService.prototype.userLeft = function( user ) {
  Log.info( 'userLeft not implemented' );
};

FireUserService.prototype.userUpdated = function( user ) {
  Log.info( 'userUpdated not implemented' );
};

module.exports = FireUserService;
