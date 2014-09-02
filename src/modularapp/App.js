'use strict';

require( 'bootstrap' );
require( 'animatecss' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// require Blades
var LoginViewModel = require( 'modularapp/login/LoginViewModel' );
var HeaderViewModel = require( 'modularapp/header/HeaderViewModel' );
var InputViewModel = require( 'modularapp/input/InputViewModel' );
var MessagesViewModel = require( 'modularapp/messages/MessagesViewModel' );
var UserCardViewModel = require( 'modularapp/usercard/UsercardViewModel' );

var App = function() {

  // Create and add Header Blade
  var headerViewModel = new HeaderViewModel();
  var headerComponent =
    new KnockoutComponent( 'modularapp.header.view-template', headerViewModel );
  var headerEl = headerComponent.getElement();
  document.body.appendChild( headerEl );

  var loginViewModel = new LoginViewModel();
  var loginComponent =
    new KnockoutComponent( 'modularapp.login.view-template', loginViewModel );
  this.loginEl = loginComponent.getElement();
  document.body.appendChild( this.loginEl );

  this.loginEl.classList.add( 'animated' );
  this.loginEl.classList.add( 'fadeInDownBig' );

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

  // Add other Blades here:

  // Create and add Messages Blade
  var messagesViewModel = new MessagesViewModel();
  var messagesComponent =
    new KnockoutComponent( 'modularapp.messages.view-template', messagesViewModel );
  var messagesEl = messagesComponent.getElement();
  document.body.appendChild( messagesEl );

  // Create and add Input Blade
  var inputViewModel = new InputViewModel();
  var inputComponent =
    new KnockoutComponent( 'modularapp.input.view-template', inputViewModel );
  var inputEl = inputComponent.getElement();
  document.body.appendChild( inputEl );

  // Create and add UserCard Blade
  var userCardViewModel = new UserCardViewModel();
  var userCardComponent =
    new KnockoutComponent( 'modularapp.usercard.view-template', userCardViewModel );
  var userCardEl = userCardComponent.getElement();
  document.body.appendChild( userCardEl );

};

module.exports = App;
