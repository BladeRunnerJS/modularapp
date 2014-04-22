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

module.exports = UserService;
