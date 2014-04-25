"use strict";

var br = require( 'br/Core' );
var ChatService = require( './ChatService' );
var emitr = require( 'emitr' );
var Log = require( 'fell' ).Log;

/**
 * Events (via emitr):
 *   new-message - when a new message has been received by the service
 */
function FakeChatService() {
  this._messages = [];
}
br.implement( FakeChatService, ChatService );
emitr.mixInto( FakeChatService );

/**
 * Send a message.
 *
 * @param {ChatMessage} message - The message to send.
 */
FakeChatService.prototype.sendMessage = function( message ) {
  this._messages.push( message );

  Log.info( 'Trigger new-message: {0}', JSON.stringify( message ) );

  this.trigger( 'new-message', message );
};

/**
 * Get a list of existing chat messages.
 *
 * @param {Object} listener - The object to be informed of chat message retrieval
 *                            success or failure.
 */
FakeChatService.prototype.getMessages = function( listener ) {
  // fake async
  var self = this;
  setTimeout( function() {
    // shallow copy
    listener.messagesRetrieved( self._messages.slice( 0 ) );
  }, 0 );
};

module.exports = FakeChatService;
