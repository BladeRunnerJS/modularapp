"use strict";

var br = require( 'br/Core' );
var ServiceRegistry = require( 'br/ServiceRegistry' );
var ChatService = require( './ChatService' );

/**
 * Events (via emitr):
 *   new-message - when a new message has been received by the service
 */
function LocalChatService() {
  this._messages = [];
  this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
}
br.implement( LocalChatService, ChatService );

/**
 * Send a message.
 *
 * @param {ChatMessage} message - The message to send.
 */
LocalChatService.prototype.sendMessage = function( message ) {
  this._messages.push( message );
  this._eventHub.channel( 'chat' ).trigger( 'new-message', message );
};

/**
 * Get a list of existing chat messages.
 *
 * @param {Object} listener - The object to be informed of chat message retrieval
 *                            success or failure.
 */
LocalChatService.prototype.getMessages = function( listener ) {
  // shallow copy
  return this._messages.slice( 0 );
};

module.exports = LocalChatService;
