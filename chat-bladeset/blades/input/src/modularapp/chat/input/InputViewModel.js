'use strict';

var ko = require( 'ko' );

function InputViewModel() {
	this.message = ko.observable( 'Hello World!' );
}

InputViewModel.prototype.buttonClicked = function() {
	console.log( 'button clicked' );
};

module.exports = InputViewModel;
