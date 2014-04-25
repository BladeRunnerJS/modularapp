'use strict';

var reqwest = require( 'reqwest' );

/**
 * Service for making HTTP requests.
 */
function Service() {
}

/**
 * Make a HTTP request
 *
 * @param {string} req.url - e.g. 'path/to/json'
 * @param {string} req.type - Optional e.g. 'json'
 * @param {string} req.method - Optional. Defaults to 'get'
 * @param {string} req.contentType - Optional. e.g. 'application/json'
 * @param {boolean} req.crossOrigin Optional.
 * @param {boolean} req.withCredentials. Optional.
 * @param {Array} req.headers - Array of name/value pairs for HTTP headers
 * @param {httpservice.ResponseListener} - Listener for the result of the request
 */
Service.prototype.request = function( req, listener ) {
  req.success = function() {
    listener.requestSucceeded.apply( listener, arguments );
  };
  req.error = function() {
    listener.requestFailed.apply( listener, arguments );
  };

  reqwest( req );
};

module.exports = Service;
