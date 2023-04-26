//console.clear();

var root  = document.documentElement;
var body  = document.body;
var pages = document.querySelectorAll(".mainFloor");
var area = document.querySelectorAll(".area");
var map = document.querySelector(".map");
var label = document.querySelectorAll(".unselectable");
//Buttons
var back = document.querySelector(".back");
var up = document.querySelector(".up");
var down = document.querySelector(".down");

/*/begin test hoverable 
const myLabel = document.querySelector('#my-label');

myLabel.addEventListener('mouseover', () => {
  myLabel.style.color = 'red';
});

myLabel.addEventListener('mouseout', () => {
  myLabel.style.color = '';
});
/*///end test hoverable 

//Adding an event listener for all of the buildings
for (var i = 0; i < pages.length; i++) {  
  addListeners(pages[i], area[i], map, back, up, down);
}

//On click it'll run grow 
function addListeners(page, area, map, back, up, down) {
  area.addEventListener("click", function() {
    grow(page, area, map, back, up, down);
  });
}

function grow(hero, area, map, back, up, down) {
    
  var clone = hero.cloneNode(true);
  
  var from = calculatePosition(area);
  var to = calculatePosition(hero);
  
  //Here we are hiding the main image
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
  //We make the clone visible and run the animation 
  gsap.set(clone, { visibility: "visible" });
  gsap.to(clone, 0.3, style)
      
  //After completion
  function onComplete() {
    //Set the map and the map's labels to hidden, reveal the back button
    gsap.set([map, label], { visibility: "hidden" });
    gsap.set(back, { visibility: "visible" });
    //And set the building map and all of the clickable room boxes to active
    gsap.set(findRooms(hero), { visibility: "visible" });

    //We name a function
    function backFun() {}

    //Kill the child (This could be earlier)
    body.removeChild(clone);

    //We identify which floors are in this building, find any directly next, and create the animation functions
    dirFuns = identifyFloors(findFloors(hero), hero, up, down, back, area, map, backFun);
    
    //Now we change the variable we set before, since we know the up and down functions now
    backFun = function() {
      shrink(hero, area, map, up, down, dirFuns);
    }

    //Now we actually add the event listeners to back, up, and down
    back.addEventListener("click", backFun, {once : true}, true); 
    if (dirFuns[0] !== 'null'){
      up.addEventListener("click", dirFuns[0], {once : true}, true);
    }
    if (dirFuns[1] !== 'null'){
      down.addEventListener("click", dirFuns[1], {once : true}, true);
    }
    
  }
}
  
function shrink(hero, area, map, up, down, dirFuns) {
  //Check to see if we need to remove the up and down functions
  if (dirFuns[0] !== 'null'){
    up.removeEventListener("click", dirFuns[0], {once : true}, true);
  }
  if (dirFuns[1] !== 'null'){
    down.removeEventListener("click", dirFuns[1], {once : true}, true);
  }
    
    //Hide the clickable rooms
    gsap.set(findRooms(hero), { visibility: "hidden" });
    gsap.set(hero, { visibility: "visible" });
    //A child
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(hero);
    var to = calculatePosition(area);
  
    //Hide all buttons, the current map
    gsap.set([back, up, down], { visibility: "hidden" });
    gsap.set(hero, { visibility: "hidden" });
    //Show the map and it's labels
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
    //Animation!
    gsap.to(clone, 0.3, style)
      
    function onComplete() {
      //Kill the child
      body.removeChild(clone);
    }
  }

//Figuring out the position of objects
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

//Find all the same elements with the second tag the same
function findRooms(element){
  var buildingRooms = element.classList[1];
  var floorsRooms = document.querySelectorAll("." + buildingRooms);
  return Array.from(floorsRooms);
}

//Find all the same elements with the first tag the same
function findFloors(element){
  var building = element.classList[0];
  var floors = document.querySelectorAll("." + building);
  return Array.from(floors);
}

//Figure out if any floor is above or below you
function identifyFloors(floorList, currFloor, up, down, back, area, map, backFun){
  var index = floorList.indexOf(currFloor);
  var upper = true;
  var lower = true;
  //Create the functions and set them to null
  function upFun() {}
  upFun = null;

  function downFun() {}
  downFun = null;
  
  //Figure out if there is an upper, a lower, or both
  if (index === -1){
    console.log("problem");
  }
  if (index + 1 >= floorList.length){
    upper = false;
  } 
  if (index - 1 <= -1){
    lower = false;
  } 

  //Create and set the up function
  if (upper == true){
    gsap.set(up, { visibility: "visible" });

    upFun = function() {
      goUp(floorList[index], floorList[index + 1], back, area, map, backFun, downFun);
    }

  }
  //Create and set the down function
  if (lower == true){
    gsap.set(down, { visibility: "visible" });

    downFun = function() {
      goDown(floorList[index], floorList[index - 1], back, area, map, backFun, upFun);
    }

  }
  //Hand back the SAME FUNCTION references
  return [upFun, downFun]
}



function goUp(currFloor, upperFloor, back, area, map, backFun, downFun){
  //Get rid of down if going up
  if (downFun !== 'null'){
    down.removeEventListener("click", downFun, {once : true}, true);
  }

  var clone = upperFloor.cloneNode(true);
      
  var to = calculatePosition(currFloor);
  //We just call it from the top of the screen
  var from = {
    top: -to.height,
    left: 0,
  };
  
  //Hide it all
  gsap.set(findRooms(currFloor), { visibility: "hidden" });
  gsap.set(clone, { position: "absolute", margin: 0 });
    

  body.appendChild(clone);  
        
  var style = {
    x: 0,
    y: to.height,
    autoRound: false,
    ease: Power1.easeOut,
    onComplete: onComplete
  };
     
  gsap.set(clone, from);  
  gsap.set(clone, { visibility: "visible" });
  gsap.to(clone, 0.3, style)
      
  function onComplete() {
    body.removeChild(clone);
    //Make them visible
    gsap.set(up,{ visibility: "hidden" });
    gsap.set(findRooms(upperFloor), { visibility: "visible" });

    //Get rid of back (THIS DOESN"T SEEM TO WORK)
    back.removeEventListener("click", backFun, {once : true}, true);
    
    //Create a new back
    function upperFun() {}
    
    //Look for floors
    dirFuns = identifyFloors(findFloors(upperFloor), upperFloor, up, down, back, area, map, upperFun);
    
    //Actually create the back
    upperFun = function() {
      shrink(upperFloor, area, map, up, down, dirFuns);
    }

    //Add 'em all
    back.addEventListener("click", upperFun, {once : true}, true);
    if (dirFuns[0] !== 'null'){
      up.addEventListener("click", dirFuns[0], {once : true}, true);
    }
    if (dirFuns[1] !== 'null'){
      down.addEventListener("click", dirFuns[1], {once : true}, true);
    }
  }
}

function goDown(currFloor, lowerFloor, back, area, map, backFun, upFun){
  //Get rid of up if going down
  if (upFun !== 'null'){
    up.removeEventListener("click", upFun, {once : true}, true);
  }

  var clone = currFloor.cloneNode(true);
        
  var from = calculatePosition(currFloor);
  
  gsap.set(findRooms(currFloor), { visibility: "hidden" });
  gsap.set(findRooms(lowerFloor), { visibility: "visible" });
  gsap.set(clone, { position: "absolute", margin: 0 });
    

  body.appendChild(clone);  
        
  var style = {
    x: 0,
    y: -from.height,
    autoRound: false,
    ease: Power1.easeOut,
    onComplete: onComplete
  };
     
  gsap.set(clone, from);  
  gsap.to(clone, 0.3, style)
      
  function onComplete() {
    
    body.removeChild(clone);
    
    gsap.set(down,{ visibility: "hidden" });
    //Get rid of back (THIS DOESN'T WORK)
    back.removeEventListener("click", backFun, {once : true}, true);

    //Create new back
    function lowerFun() {} 

    //GGet floor functions
    dirFuns = identifyFloors(findFloors(lowerFloor), lowerFloor, up, down, back, area, map, lowerFun);

    //Actually create back
    lowerFun = function() {
      shrink(lowerFloor, area, map, up, down, dirFuns);
    }

    //Set functions to buttons
    back.addEventListener("click", lowerFun, {once : true}, true);
    if (dirFuns[0] !== 'null'){
      up.addEventListener("click", dirFuns[0], {once : true}, true);
    }
    if (dirFuns[1] !== 'null'){
      down.addEventListener("click", dirFuns[1], {once : true}, true);
    }
  }
}

