'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );
var Log = require( 'fell' ).Log;

function InputViewModel() {
	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._userService = ServiceRegistry.getService( 'user.service' );

	this.enabled = ko.observable( false );
	this.message = ko.observable( '' );

	this._currentUser = null;
	this._userService.getCurrentUser( this );
}

InputViewModel.prototype.buttonClicked = function() {
	var message = this.message();
	var valid = messageValid( message );
	if( valid ) {
		var chatMessage = {
			userId: this._currentUser.userId,
			text: message,
			timestamp: new Date()
		};
		this._chatService.sendMessage( chatMessage );
		this.message( '' );
	}

	Log.info( 'sent message? {0}', valid );

	return valid;
};

/**
 * ChatService.getCurrentUser callback contract
 */
InputViewModel.prototype.userRetrieved = function( user ) {
	this._currentUser = user;
	this.enabled( true );
}

function messageValid( message ) {
	var valid = true;
	if( !message || message.trim().length === 0 ) {
		valid = false;
	}
	return valid;
}

module.exports = InputViewModel;
