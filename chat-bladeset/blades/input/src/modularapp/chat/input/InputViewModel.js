'use strict';

var ko = require( 'ko' );

function InputViewModel() {
	this.message = ko.observable( '' );
}

InputViewModel.prototype.buttonClicked = function() {
	var message = this.message();
	var valid = messageValid( message );
	if( valid ) {
		// TODO: send message
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
