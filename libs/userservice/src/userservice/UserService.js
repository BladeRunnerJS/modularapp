"user strict";

/**
 * Interface/contract for the user service.
 */
function UserService() {
}

/**
 * Sets the active user for the current application session.
 *
 * @param {userservice.User} user
 */
UserService.prototype.setCurrentUser = function( user ) {
};

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
 * Get the current user of the application.
 *
 * @param {userservice.GetUserListener} listener
 */
UserService.prototype.getUser = function( userId, listener ) {
};

module.exports = UserService;
