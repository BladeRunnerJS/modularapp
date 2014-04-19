"use strict";

var br = require( 'br/Core' );
var ChatService = require( './ChatService' );

function DummyChatService() {
}
br.implement( DummyChatService, ChatService );
