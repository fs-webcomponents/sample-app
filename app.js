page('/person/:personId', displayPerson);
page('/person', currentUser, displayPerson);

// Forward to /person by default to load the current user person's page
page('*', function(ctx){
  page('/person');
});

// Use hashbangs to get a one page app.
// For some reason this has to be after the route declarations.
page({
  hashbang: true
});

function currentUser(context, next){
  setTimeout(function(){
    context.personId = 'foo';
    next();
  });
}

function displayPerson(context){
  console.log(context);
}