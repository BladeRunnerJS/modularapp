"use strict";

/**
 * Interface/contract for chatting.
 */
function ChatService() {
}

/**
 * Send a message.
 *
 * @param {ChatMessage} message - The message to send.
 */
ChatService.prototype.sendMessage = function( message ) {};

/**
 * Get a list of existing chat messages.
 *
 * @param {Object} listener - The object to be informed of chat message retrieval
 *                            success or failure.
 */
ChatService.prototype.getMessages = function( listener ) {};

module.exports = ChatService;
