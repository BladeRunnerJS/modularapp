'use strict';

require( 'fontawesome' );
require( 'bootstrapsocial' );
require( 'bootstrap' );

var FirebaseService = require( 'firebaseservice/FirebaseService' );
var FirebaseLogin = require( 'firebaselogin' );
var emitr = require( 'emitr' );
var Log = require( 'fell' ).Log;

var ko = require( 'ko' );

function LoginViewModel() {
	this.errorMessage = ko.observable( '' );
	this.hasError = ko.computed( function() {
		return !this.errorMessage();
	}, this );
	this._loggedIn = false;
}
emitr.mixInto( LoginViewModel );

LoginViewModel.prototype.loginClicked = function() {
	var firebase = FirebaseService.getFirebase();
	var auth = new FirebaseLogin( firebase, function( error, user ) {

  	if (error) {
	    this.errorMessage( error.message );
	  }
		else if (user) {

			if( this._loggedIn ) {
				return; // duplicate
			}

			this._loggedIn = true;
	    Log.info( 'GitHub loggin succeeded. User ID: ' + JSON.stringify( user ) );

			this.trigger( 'user-logged-in', { userId: user.username } );
	  }
		else {
			this._loggedIn = false;
	  }

	}, this );

	auth.login( 'github' );
};

module.exports = LoginViewModel;
