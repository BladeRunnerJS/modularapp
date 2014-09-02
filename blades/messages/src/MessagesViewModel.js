'use strict';

var ko = require( 'ko' );

// TODO: where should UI behaviours like this be stored?
ko.bindingHandlers.maintainScrollBottom = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var scrolledToBottom = true;

		// Set initial scroll to bottom
		element.scrollTop = element.scrollHeight;

		// Listen for scroll events and keep track if we're at the bottom
		element.addEventListener( 'scroll', function() {
			scrolledToBottom = ( element.scrollTop + element.offsetHeight ) === element.scrollHeight;
		} );

		// Bind to changes on the value we're to track
		valueAccessor().subscribe(function( value ) {

			// If we are at the bottom, wait for render and then scroll back to bottom
			if( scrolledToBottom ) {
				setTimeout( function(){
					element.scrollTop = element.scrollHeight;
				}, 0);
			}
		});
  }
};

var MessageItemViewModel = require( './MessageItemViewModel' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MessagesViewModel() {
	this.messages = ko.observableArray( [] );
	this.showNoMessages = ko.computed( function() {
		return ( this.messages().length === 0 );
	}, this );

	this._chatService = ServiceRegistry.getService( 'chat.service' );
	this._chatService.getMessages( this );

	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
}

MessagesViewModel.prototype.messagesRetrieved = function( messages ) {
	messages.forEach( function( message ) {
		this.addMessage( message );
	}, this );

	this._chatService.on( 'new-message', this.addMessage, this );
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

MessagesViewModel.prototype.addMessage = function( message ) {
	var model = new MessageItemViewModel( message );
	this.messages.push( model );
};

module.exports = MessagesViewModel;
