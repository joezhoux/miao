"use strict";
window.onload = show;

function show() {
  let imgs = document.querySelectorAll(".swiper-wrapper [src]");
  let buttons = document.querySelectorAll(`.i-radio [role="button"]`);
  let prev = document.querySelector(".swiper-button-prev");
  let next = document.querySelector(".swiper-button-next");
  let container = [...buttons,...imgs,prev,next];
  let counter = 0;
  let _interval = null;

  function slideshow(curIndex) {
    imgs.forEach((node) => node.className = "");
    buttons.forEach((node) => node.className = "");
   
    (typeof curIndex == "object") ?  counter-- : counter++;
    
    counter = (typeof curIndex == "number") ? curIndex : counter;
    if (counter >= 4) {
      counter = 0;
    } else if(counter <= -1) {
      counter = 3;
    }

    imgs[counter].className = "active";
    buttons[counter].className = "active";
  }
  _interval = setInterval(() => {
    slideshow();
  }, 5000);

  buttons.forEach((node, key) => {
    node.addEventListener("click", () => {
      clearInterval(_interval);
      slideshow(key);
      _interval = setInterval(() => {
        slideshow();
      }, 5000);
    });
  });

  prev.addEventListener("click", (e) => {
    clearInterval(_interval);
    slideshow(e.target);
    _interval = setInterval(() => {
      slideshow();
    }, 5000);
  });

  next.addEventListener("click", () => {
    clearInterval(_interval);
    slideshow();
    _interval = setInterval(() => {
      slideshow();
    }, 5000);
  });

  container.forEach((node) => {

    node.addEventListener("mouseover",() => {
      clearInterval(_interval);
    })

    node.addEventListener("mouseleave",() => {
      clearInterval(_interval);
      _interval = setInterval(() => {
        slideshow();
      }, 5000);
    })

  });
  

};
