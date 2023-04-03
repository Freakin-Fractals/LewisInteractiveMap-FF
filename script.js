console.clear();

var root  = document.documentElement;
var body  = document.body;
var pages = document.querySelectorAll(".page");
var area = document.querySelectorAll(".area");
var map = document.querySelector(".map");
var label = document.querySelectorAll(".unselectable");
//Buttons
var button = document.querySelectorAll(".button");
var back = document.querySelector(".back");

for (var i = 0; i < pages.length; i++) {  
  addListeners(pages[i], area[i], map, back);
}

function addListeners(page, area, map, back) {
  console.log(back)
  area.addEventListener("click", function() {
    grow(page, area, map, back);
  });
}

function grow(hero, area, map, back) {
    
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(area);
    var to = calculatePosition(hero);
  
    gsap.set(hero, { visibility: "hidden" });
    gsap.set(clone, { position: "absolute", margin: 0 });
    
    body.appendChild(clone);  
        
    var style = {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: false,
      ease: Power1.easeOut,
      onComplete: onComplete
    };
     
    gsap.set(clone, from);  
    gsap.set(clone, { visibility: "visible" });
    gsap.to(clone, 0.3, style)
      
    function onComplete() {
      
      gsap.set([map, label], { visibility: "hidden" });
      gsap.set(button, { visibility: "visible" });
      gsap.set(hero, { visibility: "visible" });

      back.addEventListener("click", function() {
        shrink(hero, area, map);
      }); 
      
      body.removeChild(clone);
    }
  }
  
function shrink(hero, area, map) {
    
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(hero);
    var to = calculatePosition(area);
  
    gsap.set(hero, { visibility: "hidden" });
    gsap.set(button, { visibility: "hidden" });
    gsap.set([map, label], { visibility: "visible" });
    gsap.set(clone, { position: "absolute", margin: 0 });
    

    body.appendChild(clone);  
        
    var style = {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: false,
      ease: Power1.easeOut,
      onComplete: onComplete
    };
     
    gsap.set(clone, from);  
    gsap.to(clone, 0.3, style)
      
    function onComplete() {
      
      body.removeChild(clone);
    }
  }

function calculatePosition(element) {
    
  var rect = element.getBoundingClientRect();
  
  var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
  
  var clientTop  = root.clientTop  || body.clientTop  || 0;
  var clientLeft = root.clientLeft || body.clientLeft || 0;
    
  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
}


//Database
//Loads database on bottom of webpage after a couple of seconds
window.onload = function() {
  const url = "https://cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/1-tR6kESj1kzbR8j0AOO_t3mLvbMTynlif-dcqJbvfF0/export?format=csv";
  const main = document.querySelector("main");
  //main.innerHTML = "<p>Loading...</p>";
  fetch(url).then(result=>result.text()).then(function(csvtext) {
      return csv().fromString(csvtext);
  }).then(function(csv) {
      csv.forEach(function(row) {
          main.innerHTML += "---------------------------------"
          main.innerHTML += "<h3>" + row.Name + "</h3>";
          main.innerHTML += "<h3>" + row.RoomNumber + "</h3>";
          main.innerHTML += "<h3>" + row.Email + "</h3>";
          main.innerHTML += "<h3>" + row.OfficeLocation + "</h3>";
          main.innerHTML += "---------------------------------"
      })
  });
}