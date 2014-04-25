'use strict';

var br = require( 'br/Core' );
var UserService = require( './UserService' );
var User = require( './User' );

function FakeUserService() {
  this._users = {};
  this._listener = null;
}
br.implement( FakeUserService, UserService );

// UserService definitions

FakeUserService.prototype.getCurrentUser = function( listener ) {
  if( !this._currentUserId ) {
    throw new Error( 'the currentUser has not been set' );
  }

  var user = this._users[ this._currentUserId ];
  return user;
};

FakeUserService.prototype.getUsers = function( listener ) {
  // fake async
  var self = this;
  setTimeout( function() {
    var users = self._users;
    listener.usersRetrieved( users );
  }, 0 );
};

FakeUserService.prototype.setCurrentUser = function( user ) {
  checkUser( user );

  this.addUser( user );

  this._currentUserId = user.userId;
};

FakeUserService.prototype.addUser = function( user ) {
  checkUser( user );

  if( this._users[ user.userId ] !== undefined ) {
    throw new Error( 'A User with a userId of "' + user.userId + '" is already present.' );
  }

  this._users[ user.userId ] = user;
};

function checkUser( user ) {
  if( br.fulfills( user, User.prototype ) === false ) {
    var expectedContract = JSON.stringify( User, null, 2 );
    throw new Error( 'The user must fulfill the contract of a User: ' + expectedContract );
  }
}

module.exports = FakeUserService;
