'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// require Blades
var HeaderViewModel = require( 'modularapp/chat/header/HeaderViewModel' );
var InputViewModel = require( 'modularapp/chat/input/InputViewModel' );

var App = function() {

  var headerViewModel = new HeaderViewModel();
  var headerComponent = new KnockoutComponent( 'modularapp.chat.header.view-template', headerViewModel );
  var headerEl = headerComponent.getElement();
  document.body.appendChild( headerEl );

  var inputViewModel = new InputViewModel();
  var inputComponent = new KnockoutComponent( 'modularapp.chat.input.view-template', inputViewModel );
  var inputEl = inputComponent.getElement();
  document.body.appendChild( inputEl );

};

module.exports = App;
