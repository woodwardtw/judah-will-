
const _people = Array.from(document.querySelectorAll('.person'));
const _buttons = Array.from(document.querySelectorAll('.button'));
//via http://stackoverflow.com/a/4589863/3390935
//MAKE THE PEOPLE CLICKABLE
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
    clearActive(thePage);
  }
  e.preventDefault();
};


//UNDERLINE THE PEOPLE
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

//HIGHLIGHT THE PERSON
function hlPerson(person) {
  for (var i = 0; i < _people.length; i++) {
    var thePerson = _people[i].dataset.person;
    if (thePerson == person) {
      _people[i].classList.add(thePerson);
        window.location.hash = thePerson;
    }
  }
}

//LOAD THE DETAILS OF THE PERSON FROM WP API MATCH WITH URL SLUG
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


function clearActive(theSlug,callback){
  for (var i = 0; i < _buttons.length; i++) {
      _buttons[i].classList.remove("active");
    };
    activePage(theSlug);
}

function activePage(theSlug){    
    console.log(document.getElementById(theSlug).className = "button active");
}

//MAKE ALL OF THE STUFF FROM THE WP JSON API
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
        setPages(urlHash());//sets page display if hash in URL
        hlPerson(urlHash());
        urlFix();
        activePage(urlHash());
      } //success
  }); //ajax  
}); //ready



//GET THE HASH VARIABLE FROM URL 
function urlHash(){
  if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        return hash;
      // hash found
  } else {
      // No hash found
      return 'credits';
  }
}


//FIX RAMPAGES LINKS TO BEHAVE LIKE OTHER LINKS

//$( "div.second" ).replaceWith( "<h2>New heading</h2>" );
function urlFix(){
 $(function() {
    var links = $("#hiddenDetails a").map(function() {
        return this.href;
    }).get();
   // console.log(links);
});
}


//discards

//setTimeout(function(){ urlHash(); }, 1500); //hack which is no longer needed

function plainJane() {
  var will = document.getElementById("theWill");
  var className = will.getAttribute("class");
  if (className == "transcription") {
    will.setAttribute("class", "plain");
  } else {
    will.setAttribute("class", "transcription");
  }
}