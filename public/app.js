window.addEventListener('WebComponentsReady', function() {
  
  var $app = document.getElementById('app'),
      $client = document.getElementById('client'),
      $history = document.querySelector('person-history'),
      client = $client.client;
      
  $app.loading = false;
  
  page('/person/:personId', ensureAuth, loadUser, loadPerson);
  page('/person', ensureAuth, loadUser, function(){
    page('/person/' + $app.user.personId);
  });
  
  // When signed in, forward to /person by default to load the current user
  // so that we then know who the start person is.
  // When signed out, show a welcome message.
  page('/', function(){
    if($client.authenticated){
      page('/person');
    }
  });
  
  // Use hashbangs to get a one page app.
  // For some reason this has to be after the route declarations.
  page();
  
  // Reset app state on logout
  $client.addEventListener('authenticated-changed', function(event){
    if(!event.detail.value){
      $app.person = undefined;
      $app.personId = '';
      $app.user = {};
      $history.clear();
      page('/');
    }
  });
  
  // Listen for navigation events
  document.querySelector('fs-person-families').addEventListener('person-tap', function(e){
    if(e.detail.personId){
      page('/person/' + e.detail.personId);
    }
  });
  $history.addEventListener('person-select', function(e){
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
    if(!$app.username){
      $app.loading = true;
      client.get('/platform/users/current', function(error, response){
        $app.loading = false;
        if(error){
          console.error(error);
        } else if(response && response.statusCode === 200){
          $app.user = response.data.users[0];
        } else if(response && response.statusCode === 401){
          $client.signOut();
          return page('/');
        }
        next();
      });
    }
  }
  
  /**
   * Load the person for the view
   */
  function loadPerson(context, next){
    
    // Set the person ID for elements that need it to request related resources
    $app.personId = context.params.personId;
    
    // Load the person for elements that we can pass the person too. This prevents
    // them from duplicating person requests
    $app.loading = true;
    client.get('/platform/tree/persons/' + context.params.personId, function(error, response){
      if(error){
        console.error(error);
      } else if(response && response.statusCode === 200){
        $app.person = response.data.persons[0];
        $history.addPerson($app.person);
      }
      $app.loading = false;
    });
  }

});