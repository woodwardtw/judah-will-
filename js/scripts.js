
const _people = Array.from(document.querySelectorAll('.person'));

//via http://stackoverflow.com/a/4589863/3390935
document.body.onclick = function(e) {
  e = window.event ? event.srcElement : e.target;
  if (e.className && e.className.indexOf("person") != -1) {
    underPeople();
  
  findPerson = e.dataset.person;
  //console.log(findPerson);
  if (findPerson == hlPerson(findPerson)) {
    findPerson();
  }
    showDetails(findPerson);
}
  if (e.className && e.className.indexOf("button") != -1) {
    thePage = e.getAttribute('data-page');
    console.log(thePage);
    setPages(thePage);
  }
};


function underPeople() {
  for (var i = 0; i < _people.length; i++) {
    border = _people[i].style.borderBottom;
    var thePerson = _people[i].dataset.person;
    if (border == '3px solid red') {
      //people[i].style.borderBottom = 'none';
      _people[i].classList.remove(thePerson);
    } else {
      _people[i].style.borderBottom = '3px solid red';
      // people[i].classList.add(thePerson);
    }
  }
}

function hlPerson(person) {
  for (var i = 0; i < _people.length; i++) {
    var thePerson = _people[i].dataset.person;
    if (thePerson == person) {
      _people[i].classList.add(thePerson);
    }
  }
}

function showDetails(person) {
   person = person+'-details';
  var details = document.getElementsByClassName(person)[0].innerHTML;
  document.getElementById('personDetails').innerHTML = details;
}

function setPages(theSlug) {
  var thePage = theSlug+'-details';
  if (document.getElementsByClassName(thePage)[0]){
   var details = document.getElementsByClassName(thePage)[0].innerHTML;
  }
  if (document.getElementById('personDetails')){
    document.getElementById('personDetails').innerHTML = details;
  }
  window.location.hash = theSlug;
}

$(document).ready(function() {
  var def = new jQuery.Deferred();
  $.ajax({
    url: 'https://rampages.us/judahwill/wp-json/wp/v2/pages?per_page=90',
    jsonp: "cb",
    dataType: 'json',
    success: function(data) {
        console.log(data); //dumps the data to the console to check if the callback is made successfully.
        $.each(data, function(index, item) {
          $('#hiddenDetails').append('<div class="person-details hidden '+ item.slug + '-details"><div class="person-name"><h2>' + item.title.rendered + '</h2></div><div class="full-details">' + item.content.rendered + '</div>');
        }); //each
      } //success
  }); //ajax  
}); //ready


 setTimeout(function(){ urlHash(); }, 1500);


function urlHash(){
  if(window.location.hash) {

      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      console.log(hash);      
      setPages(hash);
      // hash found
  } else {
      // No hash found
  }
}


//discards
function plainJane() {
  var will = document.getElementById("theWill");
  var className = will.getAttribute("class");
  if (className == "transcription") {
    will.setAttribute("class", "plain");
  } else {
    will.setAttribute("class", "transcription");
  }
}