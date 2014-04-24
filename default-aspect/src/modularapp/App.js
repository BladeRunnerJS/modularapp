'use strict';

require( 'bootstrap' );
require( 'animatecss' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// require Blades
var LoginViewModel = require( 'modularapp/chat/login/LoginViewModel' );
var HeaderViewModel = require( 'modularapp/chat/header/HeaderViewModel' );
var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );
var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel' );

var App = function() {

  // Create and add Header Blade
  var headerViewModel = new HeaderViewModel();
  var headerComponent =
    new KnockoutComponent( 'modularapp.chat.header.view-template', headerViewModel );
  var headerEl = headerComponent.getElement();
  document.body.appendChild( headerEl );

  var loginViewModel = new LoginViewModel();
  var loginComponent =
    new KnockoutComponent( 'modularapp.chat.login.view-template', loginViewModel );
  this.loginEl = loginComponent.getElement();
  document.body.appendChild( this.loginEl );

  var self = this;
  // setTimeout( function() {
    self.loginEl.classList.add( 'animated' );
    self.loginEl.classList.add( 'fadeInDownBig' );
  // }, 2000 );


  loginViewModel.on( 'user-logged-in', this.handleUserLogin, this );
};

App.prototype.handleUserLogin = function( user ) {

  var userService = ServiceRegistry.getService( 'user.service' );
  userService.setCurrentUser( user );

  this.loginEl.classList.add( 'fadeOutUpBig' );

  var self = this;
  setTimeout( function() {
    self.loginEl.style.display = "none";
  }, 300 );

  // Create and add Messages Blade
  var messagesViewModel = new MessagesViewModel();
  var messagesComponent =
    new KnockoutComponent( 'modularapp.chat.messages.view-template', messagesViewModel );
  var messagesEl = messagesComponent.getElement();
  document.body.appendChild( messagesEl );

  // Create and add Input Blade
  var inputViewModel = new InputViewModel();
  var inputComponent =
    new KnockoutComponent( 'modularapp.chat.input.view-template', inputViewModel );
  var inputEl = inputComponent.getElement();
  document.body.appendChild( inputEl );

};

module.exports = App;
