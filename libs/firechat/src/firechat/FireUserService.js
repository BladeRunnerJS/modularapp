'use strict';

var br = require( 'br/Core' );
var emitr = require( 'emitr' );

var UserService = require( 'userservice/UserService' );
var User = require( 'userservice/User' );
var GetUserListener = require( 'userservice/GetUserListener' );
var GetUserErrorCodes = require( 'userservice/GetUserErrorCodes' );
var GitHubUserFetcher = require( 'userservice/GitHubUserFetcher' );

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
  this._users[ this._currentUser.userId ] = this._currentUser;

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

  this.getUser( this._currentUser.userId, listener );
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
    throw new Error( 'listener must fulfil the GetUserListener contract' );
  }

  var self = this;
  this._gitHubUserFetcher.getUser( userId, {
    requestSucceeded: function( response ) {
      var user = self._users[ userId ] || {};
      user.data = response;
      self._users[ userId ] = user;
      listener.userRetrieved( user );
    },
    requestFailed: function() {
      listener.userRetrievalFailed(
        GetUserErrorCodes.NOT_FOUND,
        'User data for user with userId ' + user.userId + ' not found'
      );
    }
  } );

};

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
