"use strict";

/**
 * Defines the interface/contract of a User.
 */
function User( userId ) {
  this.userId = userId;
}

/**
 * The unique ID of the user.
 *
 * @type string
 */
User.prototype.userId = '';

module.exports = User;
