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

//begin test hoverable
const myLabel = document.querySelector('#my-label');

myLabel.addEventListener('mouseover', () => {
  myLabel.style.color = 'red';
});

myLabel.addEventListener('mouseout', () => {
  myLabel.style.color = '';
});
//end test hoverable

for (var i = 0; i < pages.length; i++) {  
  addListeners(pages[i], area[i], map, back, up, down);
}

function addListeners(page, area, map, back, up, down) {
  area.addEventListener("click", function() {
    grow(page, area, map, back, up, down);
  });
}

function grow(hero, area, map, back, up, down) {
    
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
    gsap.set(back, { visibility: "visible" });
    gsap.set(findRooms(hero), { visibility: "visible" });

    function backFun() {}

    body.removeChild(clone);

    dirFuns = identifyFloors(findFloors(hero), hero, up, down, back, area, map, backFun);
    
    backFun = function() {
      shrink(hero, area, map, up, down, dirFuns);
    }

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
  if (dirFuns[0] !== 'null'){
    up.removeEventListener("click", dirFuns[0], {once : true}, true);
  }
  if (dirFuns[1] !== 'null'){
    down.removeEventListener("click", dirFuns[1], {once : true}, true);
  }
    
    gsap.set(findRooms(hero), { visibility: "hidden" });
    gsap.set(hero, { visibility: "visible" });
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(hero);
    var to = calculatePosition(area);
  
    gsap.set([back, up, down], { visibility: "hidden" });
    gsap.set(hero, { visibility: "hidden" });
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

function findRooms(element){
  var buildingRooms = element.classList[1];
  var floorsRooms = document.querySelectorAll("." + buildingRooms);
  return Array.from(floorsRooms);
}

function findFloors(element){
  var building = element.classList[0];
  var floors = document.querySelectorAll("." + building);
  return Array.from(floors);
}

function identifyFloors(floorList, currFloor, up, down, back, area, map, backFun){
  var index = floorList.indexOf(currFloor);
  var upper = true;
  var lower = true;
  function upFun() {}
  upFun = null;

  function downFun() {}
  downFun = null;
  

  if (index === -1){
    console.log("problem");
  }
  if (index + 1 >= floorList.length){
    upper = false;
  } 
  if (index - 1 <= -1){
    lower = false;
  } 

  if (upper == true){
    gsap.set(up, { visibility: "visible" });

    upFun = function() {
      goUp(floorList[index], floorList[index + 1], back, area, map, backFun, downFun);
    }

  }
  if (lower == true){
    gsap.set(down, { visibility: "visible" });

    downFun = function() {
      goDown(floorList[index], floorList[index - 1], back, area, map, backFun, upFun);
    }

  }
  return [upFun, downFun]
}



function goUp(currFloor, upperFloor, back, area, map, backFun, downFun){
  if (downFun !== 'null'){
    down.removeEventListener("click", downFun, {once : true}, true);
  }

  var clone = upperFloor.cloneNode(true);
        
  var to = calculatePosition(currFloor);
  var from = {
    top: -to.height,
    left: 0,
  };
  
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

    gsap.set(up,{ visibility: "hidden" });
    gsap.set(findRooms(upperFloor), { visibility: "visible" });

    back.removeEventListener("click", backFun, {once : true}, true);
    
    function upperFun() {}
    
    dirFuns = identifyFloors(findFloors(upperFloor), upperFloor, up, down, back, area, map, upperFun);
    
    upperFun = function() {
      shrink(upperFloor, area, map, up, down, dirFuns);
    }

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
    back.removeEventListener("click", backFun, {once : true}, true);

    function lowerFun() {} 

    dirFuns = identifyFloors(findFloors(lowerFloor), lowerFloor, up, down, back, area, map, lowerFun);

    lowerFun = function() {
      shrink(lowerFloor, area, map, up, down, dirFuns);
    }

    back.addEventListener("click", lowerFun, {once : true}, true);
    if (dirFuns[0] !== 'null'){
      up.addEventListener("click", dirFuns[0], {once : true}, true);
    }
    if (dirFuns[1] !== 'null'){
      down.addEventListener("click", dirFuns[1], {once : true}, true);
    }
  }
}

