'use strict';

require( 'jasmine' );

var UsercardViewModel = require( 'modularapp/chat/usercard/UsercardViewModel');
var ServiceRegistry = require( 'br/ServiceRegistry' );

describe( 'The User Card', function() {

  it( 'Should show the User Card when a User Selected event occurs', function() {
    jasmine.Clock.useMock();

    var eventHub = ServiceRegistry.getService( 'br.event-hub' );

    var usercardViewModel = new UsercardViewModel();

    var channel = eventHub.channel( 'user' );
    channel.trigger( 'user-selected', { userId: 'testUser' } );

    jasmine.Clock.tick( 1 );

    expect( usercardViewModel.cardShown() ).toBe( true );
  } );

  it( 'Should show the user information that the User Service provides', function() {
    jasmine.Clock.useMock();

    var eventHub = ServiceRegistry.getService( 'br.event-hub' );
    var userService = ServiceRegistry.getService( 'user.service' );
    var user = {
      userId: 'crazyLegs',
      data: {
        avatar_url: 'http://stream1.gifsoup.com/view2/1414597/crazy-legs-o.gif',
        login: 'crazylegs',
        company: 'Disney',
        name: 'Dancin\' Dude!'
      }
    };
    userService.addUser( user );

    var usercardViewModel = new UsercardViewModel();

    // TODO: trigger 'user-selected' event on 'user' channel as done earlier
    var channel = eventHub.channel( 'user' );
    channel.trigger( 'user-selected', { userId: user.userId } );

    jasmine.Clock.tick( 1 );

    // Assert
    expect( usercardViewModel.name() ).toBe( user.data.name );
    expect( usercardViewModel.avatarUrl() ).toBe( user.data.avatar_url );
    expect( usercardViewModel.company() ).toBe( user.data.company );

  } );

} );
