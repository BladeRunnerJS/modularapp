'use strict';

var moment = require( 'momentjs' );

function MessageItemViewModel( message ) {
  var formattedDate = moment( message.timestamp ).format('h:mm:ss a');

  this.text = ko.observable( message.text );
  this.timestamp = ko.observable( formattedDate );
  this.userId = ko.observable( message.userId );
}

module.exports = MessageItemViewModel;
