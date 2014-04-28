"use strict";
var ServiceRegistry = require( 'br/ServiceRegistry' );

function ChatWorkbenchTool( ) {
	this.userId = ko.observable();
	this.message = ko.observable();

	this._el = document.createElement("div");
	this._component = new KnockoutComponent( 'chatservice.workbench-chat-tool', this );
	this._el.appendChild( this._component.getElement() );
	this._chatServiceFake = ServiceRegistry.getService( 'chat.service' );
};

ChatWorkbenchTool.prototype.getElement = function() {
	  return this._el;
};

ChatWorkbenchTool.prototype.send = function() {
	var userId = this.userId();
	var text = this.message();
	var msg =  { userId: userId, text: text, timestamp: new Date() };
	this._chatServiceFake.sendMessage(msg);
};

module.exports = ChatWorkbenchTool;
