'use strict';

require( 'bootstrap' );

var ko = require( 'ko' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

function UsercardViewModel() {
	this.userInfo = ko.observable();

	this.cardShown = ko.observable( false );
	this.hasUserInfo = ko.computed( function() {
		return ( this.cardShown() && this.userInfo() );
	}, this )

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
UsercardViewModel.prototype.userSelected = function( userInfo ) {
	this._userService.getUser( userInfo.userId, this );
};

/**
 * @see {userservice.GetUserListener.userRetrieved}
 */
UsercardViewModel.prototype.userRetrieved = function( user ) {
	this.userInfo( user );
	this.cardShown( true );
};

/**
* @see {userservice.GetUserListener.userRetrievalFailed}
*/
UsercardViewModel.prototype.userRetrievalFailed = function( code, message ) {
	// this is unexpected, hence the error
	throw new Error( message );
};

module.exports = UsercardViewModel;
