"use strict";

var br = require( 'br/Core' );
var ChatService = require( './ChatService' );
var emitr = require( 'emitr' );
var Log = require( 'fell' ).Log;

/**
 * Events (via emitr):
 *   new-message - when a new message has been received by the service
 */
function LocalChatService() {
  this._messages = [];
}
br.implement( LocalChatService, ChatService );
emitr.mixInto( LocalChatService );

/**
 * Send a message.
 *
 * @param {ChatMessage} message - The message to send.
 */
LocalChatService.prototype.sendMessage = function( message ) {
  this._messages.push( message );

  Log.info( 'Trigger new-message: {0}', message );

  this.trigger( 'new-message', message );
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
