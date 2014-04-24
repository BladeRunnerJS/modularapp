'user strict';

var br = require( 'br/Core' );
var Firebase = require( 'firebase' );
var emitr = require( 'emitr' );

var UserService = require( 'userservice/UserService' );
var User = require( 'userservice/User' );
var ChatService = require( 'chatservice/ChatService' );

var Presence = require( './Presence' );
var Log = require( 'fell' ).Log;

var FirebaseService = require( 'firebaseservice/FirebaseService' );

function FireUserService() {
  this._firebase = null;
  this._presence = null;

  this._currentUser = null;
  this._users = {};
}
br.implement( FireUserService, UserService );
emitr.mixInto( FireUserService );

// UserService definitions

FireUserService.prototype.setCurrentUser = function( user ) {
  if( br.fulfills( user, User.prototype ) === false ) {
    throw new Error( 'user must fulfill the User contract: ' + JSON.stringify( User ) );
  }

  this._currentUser = user;

  this._firebase = FirebaseService.getFirebase();
  this._presence = new Presence( this._firebase, user.userId, {}, this );
};

FireUserService.prototype.getCurrentUser = function( listener ) {
  if( this._currentUser === null ) {
    throw new Error( 'currentUser has not been set.' );
  }

  var self = this;
  setTimeout( function() {
    listener.userRetrieved( self._currentUser );
  }, 0 )
};

FireUserService.prototype.getUsers = function( listener ) {
  setTimeout( function() {
    listener.usersRetrieved( this._users );
  }, 0 );
};

FireUserService.prototype.addUser = function( user ) {
  throw new Error( 'addUser not implemented in FireUserService' );
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
