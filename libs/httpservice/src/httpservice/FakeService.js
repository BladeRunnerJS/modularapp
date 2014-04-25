'use strict';

/**
 * FakeService for making HTTP request testing.
 */
function FakeService() {
  this.pendingRequest = null;
}

/**
 * @see {httpservice.Service.request}.
 */
FakeService.prototype.request = function( req, listener ) {
  this.pendingRequest = req;

  this.pendingRequest.success = function() {
    listener.requestSucceeded.apply( listener, arguments );
  };
  this.pendingRequest.error = function() {
    listener.requestFailed.apply( listener, arguments );
  };
};

module.exports = FakeService;
