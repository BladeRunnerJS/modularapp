'use strict';

var br = require( 'br/Core' );
var emitr = require( 'emitr' );

var ChatService = require( 'chatservice/ChatService' );

var Log = require( 'fell' ).Log;

var FirebaseService = require( './FirebaseService' );

function FireChatService() {
  this._firebase = FirebaseService.getFirebase();
  this._messagesRef = this._firebase.child( 'messages' );
  this._messagesRef.on( 'child_added', this._messageAdded, this );
}
br.implement( FireChatService, ChatService );
emitr.mixInto( FireChatService );

// ChatService definitions

FireChatService.prototype.sendMessage = function( message ) {
  if( this._messagesRef === null ) {
    throw new Error( 'Firebase has not been initialised. Please setCurrentUser.' );
  }

  this._messagesRef.push( message );
};

FireChatService.prototype.getMessages = function( listener ) {
  this._messagesRef.once( 'value', function( data ) {
    var messages = [];
    data.forEach( function( message ) {
      messages.push( message.val() );
    } );
    listener.messagesRetrieved( messages );
  } );
};

// Private functions

FireChatService.prototype._messageAdded = function( data ) {
  // TODO: consider making this public so it can be tested.
  var message = data.val();

  Log.info( 'Message added: {0}', JSON.stringify( message ) );

  this.trigger( 'new-message', message );
};

module.exports = FireChatService;
