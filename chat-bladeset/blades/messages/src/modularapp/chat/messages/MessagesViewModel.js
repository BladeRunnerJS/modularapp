'use strict';

var ko = require( 'ko' );

var MessageItemViewModel = require( './MessageItemViewModel' );

function MessagesViewModel() {
	this.messages = ko.observableArray( [] );

	// Temporarily add some fake data
	this._addMessage( { userId: 'leggetter', text: 'hello', timestamp: new Date() } );
	this._addMessage( { userId: 'andyberry88', text: 'yo', timestamp: new Date() } );
}

MessagesViewModel.prototype._addMessage = function( message ) {
	var model = new MessageItemViewModel( message );
	this.messages.push( model );
}

module.exports = MessagesViewModel;
