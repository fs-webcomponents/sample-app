window.addEventListener('WebComponentsReady', function() {
  
  var app = document.getElementById('app'),
      client = document.getElementById('client').client;
  
  page('/person/:personId', currentUser, displayPerson);
  page('/person', currentUser, displayPerson);
  
  // Forward to /person by default to load the current user person's page
  page('/', function(ctx){
    page('/person');
  });
  
  // Use hashbangs to get a one page app.
  // For some reason this has to be after the route declarations.
  page({
    hashbang: true
  });
  
  function currentUser(context, next){
    client.getCurrentUser().then(function(response){
      context.user = response.getUser();
      next();
    });
  }
  
  function displayPerson(context){
    var personId = context.params.personId;
    if(!personId){
      personId = context.user.getPersonId();
    }
    
    // In sandbox, users are given random names which sometimes confuses
    // people so we show the contact name here instead. In production you'll
    // probaly want to chang this to `getDisplayName()`.
    app.username = context.user.getContactName();
    app.personId = personId;
  }

});