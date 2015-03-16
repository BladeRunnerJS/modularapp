(function() {
  
'use strict';

require( 'jasmine' );

var InputViewModel = require( 'modularapp/input/InputViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );
var userService = ServiceRegistry.getService( 'user.service' );
var chatService = ServiceRegistry.getService( 'chat.service' );

describe( 'The Input', function() {

  it( 'Requests a user from the UserService', function() {
    spyOn( userService, 'getCurrentUser' );
    var inputViewModel = new InputViewModel();
    expect( userService.getCurrentUser ).toHaveBeenCalled();
  } );

  it( 'Sends a message when the user has entered text and clicks the send button', function() {
    spyOn( chatService, 'sendMessage' );

    var userId = 'testUser';
    var text = 'yo!';
    var testUser = { userId: userId };

    userService.setCurrentUser( testUser );

    var inputViewModel = new InputViewModel();
    inputViewModel.userRetrieved( testUser );

    inputViewModel.message( text );
    inputViewModel.buttonClicked();

    var expectedMessage = { userId: userId, text: text, timestamp: jasmine.any( Date ) };
    expect( chatService.sendMessage ).toHaveBeenCalledWith( expectedMessage );
  } );

  it( 'Disables the interface when the current user is not available', function() {
    userService.setUserDataFetcher( 'failing', { count: 1 } );

    var inputViewModel = new InputViewModel();
    expect( inputViewModel.enabled() ).toBe( false );
  } );

  it( 'Provides the user with a feedback messages when the current user is not available', function() {
    userService.setUserDataFetcher( 'failing', { count: 1 } );

    var inputViewModel = new InputViewModel();
    var defaultValue = '';
    expect( inputViewModel.feedbackMessage() ).not.toBe( defaultValue );
  } );

} );

})();
