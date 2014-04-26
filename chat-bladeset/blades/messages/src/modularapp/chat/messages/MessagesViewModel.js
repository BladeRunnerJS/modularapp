'use strict';

var ko = require( 'ko' );

var MessageItemViewModel = require( './MessageItemViewModel' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MessagesViewModel() {
	this._isScrolledToBottom = false;

	this.messages = ko.observableArray( [] );

	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._chatService.getMessages( this );

	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
}

MessagesViewModel.prototype.messagesRetrieved = function( messages ) {
	messages.forEach( function( message ) {
		this._addMessage( message );
	}, this );

	this._chatService.on( 'new-message', this._addMessage, this );
};

MessagesViewModel.prototype.userSelected = function( data, event ) {
	var eventData = {
		userId: data.userId(),
		position: {
			x: event.clientX,
			y: event.clientY
		}
	};
	this._eventHub.channel( 'user' ).trigger( 'user-selected', eventData );
};

MessagesViewModel.prototype._addMessage = function( message ) {
	var model = new MessageItemViewModel( message );
	this.messages.push( model );
};

module.exports = MessagesViewModel;
