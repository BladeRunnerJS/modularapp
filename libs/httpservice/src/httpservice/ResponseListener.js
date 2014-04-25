'use strict';

/**
 * Interface/contract for listening to the result of calls to
 * {restul.Service.request}s.
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
