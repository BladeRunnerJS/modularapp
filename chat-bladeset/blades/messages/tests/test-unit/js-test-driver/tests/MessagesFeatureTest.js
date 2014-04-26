'use strict';

require( 'jasmine' );

var MessagesViewModel = require( 'modularapp/chat/messages/MessagesViewModel');
var MessageItemViewModel = require( 'modularapp/chat/messages/MessageItemViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );
var eventHub = ServiceRegistry.getService( 'br.event-hub' );
var userChannel = eventHub.channel( 'user' );

describe('When a user is selected in the MessagesViewModel', function() {

  it( 'it triggers a "user-selected" event on a user channel on the EventHub', function() {

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

});
