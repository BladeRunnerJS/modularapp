function Presence( dataSync, userId, userData, listener, options ) {
  if( !dataSync ) {
    throw new Error( 'dataSync must be defined' );
  }

  if( !userId ) {
    throw new Error( 'userId must be defined' );
  }

  if( !listener ) {
    throw new Error( 'listener must be defined' );
  }

  this._dataSync  = dataSync;
  this._listener  = listener;
  this._options   = Presence._getOptions( options );

  this.user = {
    userId: userId,
    status: Presence.STATUS.away,
    userData: userData
  };

  this._connectedRef = this._dataSync.root().child( '.info/connected' );
  this._presenceRef = this._dataSync.child( this._options.presenceNode );
  this._userRef = this._presenceRef.child( this.user.userId );

  this._connectedRef.on( 'value', this._handlePresenceChange, this );
  this._presenceRef.on( 'child_added',  this._userJoined, this );
  this._presenceRef.on( 'child_removed', this._userLeft, this );
  this._presenceRef.on( 'child_changed', this._userUpdated, this );
}

/** Static */
Presence.STATUS = {
  online:   'online',
  idle:     'idle',
  away:     'away'
};

Presence.DEFAULT_OPTIONS = {
  presenceNode:   '/presence' // e.g. the room
};

/** @private */
Presence._getOptions = function( options ) {
  options = options || {};
  for( var o in Presence.DEFAULT_OPTIONS ) {
    if( options[ o ] === undefined ) {
      options[ o ] = Presence.DEFAULT_OPTIONS[ o ];
    }
  }
  return options;
};

/** @private */
Presence.prototype._handlePresenceChange = function( isOnline ) {
  if ( isOnline.val() ) {
    // If we lose our internet connection, we want ourselves removed from the list.
    this._userRef.onDisconnect().remove();

    // Set our initial online status.
    this.setUserStatus( Presence.STATUS.online );
  }
  else {
    // We need to catch anytime we are marked as offline and then set the correct status. We
    // could be marked as offline 1) on page load or 2) when we lose our internet connection
    // temporarily.
    this.setUserStatus( this.user.status );
  }
};

/** @private */
Presence.prototype._userJoined = function( user ) {
  this._listener.userJoined( user.val() );
};

/** @private */
Presence.prototype._userLeft = function( user ) {
  this._listener.userLeft( user.val() );
};

/** @private */
Presence.prototype._userUpdated = function( user ) {
  this._listener.userUpdated( user.val() );
};

/**
 * Sets the status of the user.
 * @param {Presence.STATUS} The new user status.
 */
Presence.prototype.setUserStatus = function( status ) {
  if( Presence.STATUS[ status ] === undefined ) {
    throw new Error( 'Unknown status value of "' + status + '". ' +
                     'Valid values are: ' + JSON.stringify( Presence.STATUS ) );
  }

  this.user.status = status;
  // TODO: consider setting this._userRef.child( 'status' ).set( this.user.status )
  // it may stop unwanted 'child_changed' and 'value' events being triggered.
  this._userRef.set( this.user );
};

module.exports = Presence;
