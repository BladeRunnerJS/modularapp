'use strict';

var GITHUB_USER_API_URL = 'https://api.github.com/users/';
var QUESTIONMARK = "?client_id=24bae97c879ec31a3422&client_secret=cb72b3adfd4570d9088d2808641d3dac5b03cee2";

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
  var githubUserUrl = GITHUB_USER_API_URL + userId + QUESTIONMARK;
  this._httpService.request( {
    url: githubUserUrl,
    type: 'json'
  }, listener );
};

module.exports = GitHubUserFetcher;
