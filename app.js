window.addEventListener('WebComponentsReady', function() {
  
  var app = document.getElementById('app'),
      $client = document.getElementById('client'),
      client = $client.client;
  
  page('/person/:personId', ensureAuth, currentUser, displayPerson);
  page('/person', ensureAuth, currentUser, displayPerson);
  
  // Forward to /person by default to load the current user person's page
  page('/', function(ctx){
    page('/person');
  });
  
  // Use hashbangs to get a one page app.
  // For some reason this has to be after the route declarations.
  page({
    hashbang: true
  });
  
  // Handle logout
  $client.addEventListener('authenticated-changed', function(event){
    if(!event.detail.value){
      app.personId = '';
      app.username = '';
    }
  });
  
  // Listen for navigation events
  document.querySelector('fs-person-families').addEventListener('person-tap', function(e){
    if(e.detail.personId){
      page('/person/' + e.detail.personId);
    }
  });
  
  /**
   * Make sure the user is authenticated.
   */
  function ensureAuth(context, next){
    if(!client.getAccessToken()){
      $client.addEventListener('authenticated-changed', function(event){
        if(event.detail.value){
          next();
        }
      });
    } else {
      next();
    }
  }
  
  /**
   * Get the current user so we can show the username in the title.
   * We might also need the current user's person id.
   */
  function currentUser(context, next){
    client.get('/platform/users/current', function(error, response){
      if(error){
        console.error(error);
      } else if(response && response.statusCode === 200){
        context.user = response.data.users[0];
      }
      next();
    });
  }
  
  /**
   * Show the requested person of the current user's person
   */
  function displayPerson(context){
    
    // Use the current user's person id if there was no person id
    // specified in the url
    var personId = context.params.personId;
    if(!personId){
      personId = context.user.personId;
    }
    
    // In sandbox, users are given random names which sometimes confuses
    // people so we show the contact name here instead. In production you'll
    // probaly want to chang this to displayName.
    app.username = context.user.contactName;
    app.personId = personId;
  }

});