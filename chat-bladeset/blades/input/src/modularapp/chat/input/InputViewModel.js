'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );
var Log = require( 'fell' ).Log;

function InputViewModel() {
	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._userService = ServiceRegistry.getService( 'user.service' );

	this.message = ko.observable( '' );
}

InputViewModel.prototype.buttonClicked = function() {
	var message = this.message();
	var valid = messageValid( message );
	if( valid ) {
		var chatMessage = {
			userId: 'testUser',
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
