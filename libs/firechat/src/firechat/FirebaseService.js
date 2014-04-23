'use strict';

// TODO: move this to a configuration service.
var FIREBASE_URL = 'https://futurejs.firebaseio.com/';

var Firebase = require( 'firebase' );

function FirebaseService() {}

FirebaseService._firebase = null;

FirebaseService.getFirebase = function() {
  if( FirebaseService._firebase === null ) {
    FirebaseService._firebase = new Firebase( FIREBASE_URL );
  }

  return FirebaseService._firebase;
};

module.exports = FirebaseService;
