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
  // fake async
  var self = this;
  this._listener = listener;
  setTimeout( function() {
    var user = self._users[ self._currentUserId ];
    listener.userRetrieved( user );
  }, 0 );
};

FakeUserService.prototype.setCurrentUserFromServer = function( user ) {
	if(this._listener){
		this._listener.userRetrieved( user );
	}
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
