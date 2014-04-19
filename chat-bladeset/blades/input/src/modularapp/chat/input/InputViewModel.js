'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function InputViewModel() {
	this.message = ko.observable( '' );
	this._chatService = ServiceRegistry.getService( 'chat.service' );
}

InputViewModel.prototype.buttonClicked = function() {
	var message = this.message();
	var valid = messageValid( message );
	if( valid ) {
		this._chatService.sendMessage( message );
	}

	console.log( 'sent message?', valid );
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
