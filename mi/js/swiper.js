"use strict";
window.onload = show;
function show() {
  let images = document.querySelectorAll(".swiper-wrapper [src]");
  let buttons = document.querySelectorAll(`.i-radio [role="button"]`); 
  let targetActive = 0; 

  function imgOut() {
    images[targetActive].className = "";
    buttons[targetActive].className = "";
  };

  function imgInto() {
    images[targetActive].className = "active";
    buttons[targetActive].className = "active";
  };

  function changeImg() {
    imgOut();
    targetActive++;
    if(targetActive >= 4) {
      targetActive = 0;
    }
    imgInto();
  }

  let showTime = setInterval(changeImg,5000);

  show.onmouseover = function() {
    clearInterval(showTime);
  }
  show.onmouseout = function() {
    showTime = setInterval(changeImg,5000);
  }

  buttons.forEach((node,key) => {
    node.addEventListener("click",function() {
      
    })
  })  
};
