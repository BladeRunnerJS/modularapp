'use strict';

var ko = require( 'ko' );

function HeaderViewModel() {
	this.message = ko.observable( 'Hello World!' );
}

HeaderViewModel.prototype.buttonClicked = function() {
	console.log( 'button clicked' );
};

module.exports = HeaderViewModel;
