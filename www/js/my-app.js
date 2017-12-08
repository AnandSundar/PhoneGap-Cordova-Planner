// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$('#task-form').on('submit', function(e) {
  e.preventDefault();

  var name = $$('#name').val();
  var body = $$('#body').val();
  var due = $$('#due').val();

  addTask(name, body, due);
  window.location.href = 'index.html';
});



function addTask(name, body, due) {
  //store task in local storage
  if(localStorage.getItem('tasks') === null){
    //create a new task
    var tasks = [];
    var id = guid();
    tasks.push({id:id, name:name, body:body, due:due});
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }else{
    //fetch the old task and add the new task to it
    var tasks = JSON.parse(localStorage.getItem('tasks')); //old tasks
    var id = guid();
    tasks.push({id:id, name:name, body:body, due:due});
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

//code snippet taken from stackoverflow
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
