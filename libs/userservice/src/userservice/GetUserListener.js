/**
 * Interface/contract to listen to user retrieval.
 * @property {Function} userRetrieved - User retrieved successfully.
 * @property {Function} userRetrievalFailed -
 */
 function GetUserListener() {
 }

 /**
  * User retrieval successful.
  *
  * @param {userservice.User} user - The retrieved user
  */
 GetUserListener.prototype.userRetrieved = function( user ) {};

 /**
  * User retrieval failed e.g. the user with the provided userId was not found.
  *
  */
 GetUserListener.prototype.userRetrievalFailed = function( code, message ) {};

 module.exports = GetUserListener;
