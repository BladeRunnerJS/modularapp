'use strict';

var ko = require( 'ko' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var POSITION_DEFAULT = { x: '50%', y: 0 };

function UsercardViewModel() {
	this.avatarUrl = ko.observable('');
	this.name = ko.observable('');
	this.company = ko.observable('');
	this.email = ko.observable('');
	this.location = ko.observable('');

	this.position = ko.observable( pixelify( POSITION_DEFAULT ) );
	this.cardShown = ko.observable( false );

	this._userService = ServiceRegistry.getService( 'user.service' );
	
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
	this._eventHub.channel( 'user' ).on( 'user-selected', this.userSelected, this );
}

UsercardViewModel.prototype.closeClicked = function( data, event ) {
	this.cardShown( false );
};

/**
 * User selected event handler.
 */
UsercardViewModel.prototype.userSelected = function( data ) {
	this._userService.getUser( data.userId, this );

	var newPos = pixelify( data.position || POSITION_DEFAULT );
	this.position( newPos );
};

/**
 * @see {userservice.GetUserListener.userRetrieved}
 */
UsercardViewModel.prototype.userRetrieved = function( user ) {
	this.avatarUrl( user.data.avatar_url );
	this.name( user.data.name );
	this.company( user.data.company );
	this.email( user.data.email );
	this.location( user.data.location );
	this.cardShown( true );
};

/**
* @see {userservice.GetUserListener.userRetrievalFailed}
*/
UsercardViewModel.prototype.userRetrievalFailed = function( code, message ) {
	// this is unexpected, hence the error
	throw new Error( message );
};

function pixelify( pos ) {
	var newPos = {};
	var value;
	for( var prop in pos ) {
		value = pos[ prop ];
		// only add px to number values
		if( isNaN( value ) === false ) {
			newPos[ prop ] = value + 'px';
		}
		else {
			newPos[ prop ] = value;
		}
	}
	return newPos;
}

module.exports = UsercardViewModel;
