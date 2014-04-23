'use strict';

var ko = require( 'ko' );

var MessageItemViewModel = require( './MessageItemViewModel' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MessagesViewModel() {
	this.messages = ko.observableArray( [] );

	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._chatService.getMessages( this );
}

MessagesViewModel.prototype.messagesRetrieved = function( messages ) {
	messages.forEach( function( message ) {
		this._addMessage( message );
	}, this );
};

MessagesViewModel.prototype._addMessage = function( message ) {
	var model = new MessageItemViewModel( message );
	this.messages.push( model );
};

module.exports = MessagesViewModel;
