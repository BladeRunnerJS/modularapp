"use strict";

/**
 * The structure of a chat message.
 *
 * @param {String} userId A unique identifier for the user senting the chat message
 * @param {String} text The text of the message
 * @param {Date} timestamp When the message was created
 */
function ChatMessage( userId, text, timestamp ) {
  this.userId = userId;
  this.text = text;
  this.timestamp = timestamp;
}

module.exports = ChatMessage;
