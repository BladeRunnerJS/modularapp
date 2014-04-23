"user strict";

/**
 * Interface/contract for the user service.
 */
function UserService() {
}

/**
 * Used to listen to user retrieval.
 * @typedef {Object} UserService~GetUserListener
 * @property {Function} userRetrieved - User retrieved successfully.
 * @property {Function} userRetrievalFailed - User retrieval failed.
 */

/**
 * Get the current user of the application.
 *
 * @param {...GetUserListener} listener
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
 * @param {userservice.User} user
 */
UserService.prototype.addUser = function( user ) {
};

module.exports = UserService;
