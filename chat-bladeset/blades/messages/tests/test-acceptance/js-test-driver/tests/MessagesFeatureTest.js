'use strict';

require( 'jasmine' );

var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel');
var MessageItemViewModel = require( 'modularapp/chat/messages/MessageItemViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );
var eventHub = ServiceRegistry.getService( 'br.event-hub' );
var userChannel = eventHub.channel( 'user' );

describe('The Messages', function() {

  afterEach(function() {
    var chatService = ServiceRegistry.getService( 'chat.service' );
    chatService.fakeAsync = true;
  } );

  it( 'Should trigger a "user-selected" event on a user channel on the EventHub when a user is selected', function() {

    spyOn( eventHub, 'channel' ).andCallThrough();
    spyOn( userChannel, 'trigger' );

    var messagesViewModel = new MessagesViewModel();
    var message = { userId: 'testUserId', text: 'testUserText', timestamp: new Date() };
    var messageItemViewModel = new MessageItemViewModel( message );
    var fakeEvent = {
      clientX: 0,
      clientY: 0
    };

    messagesViewModel.userSelected( messageItemViewModel, fakeEvent );

    var expectedEventData = {
      userId: message.userId,
      position: {
        x: fakeEvent.clientX,
        y: fakeEvent.clientY
      }
    };
    expect( eventHub.channel ).toHaveBeenCalledWith( 'user' );
    expect( userChannel.trigger ).toHaveBeenCalledWith( 'user-selected', expectedEventData );
  } );

  it( 'Should display new messages that are send via the Chat Service', function() {
    // Setup
    var chatService = ServiceRegistry.getService( 'chat.service' );
    chatService.fakeAsync = false;
    var messagesViewModel = new MessagesViewModel();
    var message = { userId: 'testUserId', text: 'testUserText', timestamp: new Date() };

    // Execute
    chatService.sendMessage( message );

    // Assert
    var firstMessage = messagesViewModel.messages()[ 0 ];
    expect( firstMessage.userId() ).toBe( message.userId );
    expect( firstMessage.text() ).toBe( message.text );
    expect( firstMessage.timestamp() ).toBeTruthy();
  } );

});
