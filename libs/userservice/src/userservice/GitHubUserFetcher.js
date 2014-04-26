'use strict';

var GITHUB_USER_API_URL = 'https://api.github.com/users/';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function GitHubUserFetcher() {
  this._httpService = ServiceRegistry.getService( 'http.service' );
}

/**
 * Get a user from the GitHub API.
 *
 * @param {string} userId - the ID of the user.
 * @param {httpservice.ResponseListener} listener - response listening object
 */
GitHubUserFetcher.prototype.getUser = function( userId, listener ) {
  var githubUserUrl = GITHUB_USER_API_URL + userId;
  this._httpService.request( {
    url: githubUserUrl,
    type: 'json'
  }, listener );
};

module.exports = GitHubUserFetcher;
