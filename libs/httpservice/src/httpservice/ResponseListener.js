'use strict';

/**
 * Interface/contract for listening to the result of calls to
 * {httpservice.Service.request} results.
 */
function ResponseListener() {
}

/**
 *
 */
ResponseListener.prototype.requestSucceeded = function( response ) {};

/**
 *
 */
ResponseListener.prototype.requestFailed = function( error ) {};

module.exports = ResponseListener;
