'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// require Blades
var HeaderViewModel = require( 'modularapp/chat/header/HeaderViewModel' );

var App = function() {
  var headerViewModel = new HeaderViewModel();
  var headerComponent = new KnockoutComponent( 'modularapp.chat.header.view-template', headerViewModel );
  var headerEl = headerComponent.getElement();

  document.body.appendChild( headerEl );
};

module.exports = App;
