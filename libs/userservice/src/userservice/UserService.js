"user strict";

/**
 * Interface/contract for the user service.
 */
function UserService() {
}

/**
 * Get the current user of the application.
 *
 * @returns {userservice.User} The current user
 * @throws {Error} if the user has not been set
 */
UserService.prototype.getCurrentUser = function() {
};

/**
 * Used to listen to users retrieval.
 * @typedef {Object} UserService~GetUsersListener
 * @property {Function} usersRetrived - Users retrieved successfully.
 * @property {Function} usersRetrievalFailed - User retrieval failed.
 */

/**
 * Get the current user of the application.
 *
 * @param {...GetUsersListener} listener
 */
UserService.prototype.getUsers = function( listener ) {
};

/**
 * Sets the active user for the current application session.
 *
 * @param {userservice.User} user
 */
UserService.prototype.setCurrentUser = function( user ) {
};

/**
 * Add a user to the current session. This indicates another user
 * that is using the application in another location.
 *
 * @todo: This shouldn't be part of the public API.
 *
 * @param {userservice.User} user
 */
UserService.prototype.addUser = function( user ) {
};

module.exports = UserService;
