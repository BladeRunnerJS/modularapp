'use strict';

var br = require( 'br/Core' );
var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );
var Log = require( 'fell' ).Log;
var User = require( 'userservice/User' );

function InputViewModel() {
	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._userService = ServiceRegistry.getService( 'user.service' );

	this.enabled = ko.observable( false );
	this.message = ko.observable( '' );

	this._currentUser = this._userService.getCurrentUser();
}

InputViewModel.prototype.buttonClicked = function() {
	if( this._currentUser === null ) {
		throw new Error( 'A currentUser must be set before messages can be sent' )
	}

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

function messageValid( message ) {
	var valid = true;
	if( !message || message.trim().length === 0 ) {
		valid = false;
	}
	return valid;
}

module.exports = InputViewModel;
