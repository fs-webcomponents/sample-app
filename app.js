window.addEventListener('WebComponentsReady', function() {
  
  var app = document.getElementById('app'),
      $client = document.getElementById('client'),
      client = $client.client,
      currentUser;
  
  page('/person/:personId', ensureAuth, loadUser, displayPerson);
  page('/person', ensureAuth, loadUser, displayPerson);
  
  // Forward to /person by default to load the current user person's page
  page('/', function(ctx){
    page('/person');
  });
  
  // Use hashbangs to get a one page app.
  // For some reason this has to be after the route declarations.
  page();
  
  $client.addEventListener('authenticated-changed', function(event){
    
    // Reset app state on logout
    if(!event.detail.value){
      app.personId = '';
      app.username = '';
      page('/');
    }
    
    // After login, reload the page to cleare the code query param from the URL
    else {
      window.location.href = window.location.pathname + window.location.hash;
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
  function loadUser(context, next){
    if(currentUser){
      context.user = currentUser;
      next();
    } else {
      client.get('/platform/users/current', function(error, response){
        if(error){
          console.error(error);
        } else if(response && response.statusCode === 200){
          currentUser = context.user = response.data.users[0];
        }
        next();
      });
    }
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