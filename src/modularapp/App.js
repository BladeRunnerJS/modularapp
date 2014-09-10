'use strict';

require( 'bootstrap' );
require( 'animatecss' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// require Blades
var LoginViewModel = require( 'modularapp/login/LoginViewModel' );
var HeaderViewModel = require( 'modularapp/header/HeaderViewModel' );

var App = function() {

  // Create and add Header Blade
  var headerViewModel = new HeaderViewModel();
  var headerComponent =
    new KnockoutComponent( 'modularapp.header.view-template', headerViewModel );
  var headerEl = headerComponent.getElement();
  document.body.appendChild( headerEl );

  // Create and add Login Blade
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

  // Create and add Input Blade

  // Create and add UserCard Blade

};

module.exports = App;
