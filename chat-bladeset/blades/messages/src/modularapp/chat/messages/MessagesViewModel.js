'use strict';

var ko = require( 'ko' );

function MessagesViewModel() {
	this.message = ko.observable( 'Hello World!' );
}

MessagesViewModel.prototype.buttonClicked = function() {
	console.log( 'button clicked' );
};

module.exports = MessagesViewModel;
