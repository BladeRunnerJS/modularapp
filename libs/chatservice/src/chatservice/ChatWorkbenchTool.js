"use strict";
var ServiceRegistry = require( 'br/ServiceRegistry' );

function ChatWorkbenchTool( ) {
	this.message = ko.observable();
	this.user = ko.observable();
	this._el = document.createElement("div");
	this._component = new KnockoutComponent( 'chatservice.workbench-chat-tool', this );
	this._el.appendChild( this._component.getElement() );
	this._chatServiceFake = ServiceRegistry.getService( 'chat.service' );
};

ChatWorkbenchTool.prototype.getElement = function() {
	  return this._el;
};



ChatWorkbenchTool.prototype.send = function() {
	var msg =  { userId: this.user(), text: this.message(), timestamp: new Date() }
	this._chatServiceFake.sendMessage(msg);
};
module.exports = ChatWorkbenchTool;
