"user strict";

/**
 * Interface/contract for the user service.
 */
function UserService() {
}

/**
 * Sets the active user for the current application session.
 *
 * @param {userservice.User} user The to set as the current user.
 */
UserService.prototype.setCurrentUser = function( user ) {
};

/**
 * Get the current user of the application.
 *
 * @param {userservice.GetUserListener} listener The listener for the user
 *        retrieval result.
 *
 * @throws {Error} If there is no way to get the current user e.g. the
 * current user has not been set via {@see setCurrentUser}.
 */
UserService.prototype.getCurrentUser = function( listener ) {
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
