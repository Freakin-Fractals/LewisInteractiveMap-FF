console.clear();

var root  = document.documentElement;
var body  = document.body;
var pages = document.querySelectorAll(".page");
var area = document.querySelectorAll(".area");
var map = document.querySelector(".map");

for (var i = 0; i < pages.length; i++) {  
  addListeners(pages[i], area[i], map);
}

function addListeners(page, area, map) {
  
  area.addEventListener("click", function() {
    grow(page, area, map);
  });
  
  page.addEventListener("click", function() {
    shrink(page, area, map);
  });  
}

function grow(hero, area, map) {
    
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(area);
    var to = calculatePosition(hero);
  
    gsap.set(hero, { visibility: "hidden" });
    gsap.set(clone, { position: "absolute", margin: 0 });
    
    console.log(clone);
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
      
      gsap.set(map, { visibility: "hidden" });
      gsap.set(hero, { visibility: "visible" });
      body.removeChild(clone);
    }
  }
  
function shrink(hero, area, map) {
    
    var clone = hero.cloneNode(true);
        
    var from = calculatePosition(hero);
    var to = calculatePosition(area);
  
    gsap.set(hero, { visibility: "hidden" });
    gsap.set(map, { visibility: "visible" });
    gsap.set(clone, { position: "absolute", margin: 0 });
    
    console.log(clone);
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