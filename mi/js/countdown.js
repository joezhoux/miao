"use strict";

let _time = 10800;
let minutes = 0;
let seconds = 0;
let hours = 0;
let spans = document.querySelectorAll(".countdown span");

function newInterval(func, millisecond) {
  function inside() {
    func();
    setTimeout(inside, millisecond);
  }
  setTimeout(inside, millisecond);
}

function countDown() {

  if (_time > 0) {
    hours = Math.floor(_time / 60 / 60);
    minutes = Math.floor(_time / 60 % 60);
    seconds = Math.floor(_time % 60 % 60);
    _time--;
  } else {
    _time = 10800;
    hours = Math.floor(_time / 60 / 60);
    minutes = Math.floor(_time / 60 % 60);
    seconds = Math.floor(_time % 60 % 60);
    _time--;
  }

  spans.forEach((node, key) => {
    if (node.getAttribute("class") == "hours") {
      if (hours != parseInt(node.innerHTML)) {
        spans[key].innerHTML = "0" + hours;
      }
    } else if (node.getAttribute("class") == "minutes") {
      if (minutes != parseInt(node.innerHTML)) {
        spans[key].innerHTML = minutes < 10 ? ("0" + minutes) : minutes;
      }
    } else if (node.getAttribute("class") == "seconds") {
      spans[key].innerHTML = seconds < 10 ? ("0" + seconds) : seconds;
    }
  });

}

newInterval(countDown, 1000);

let flashsaleSwiper = document.querySelector(".flashsale-swiper");
let arrowBox = document.querySelectorAll(".arrow-box span");
let flashsaleSwiperLeft = parseInt(window.getComputedStyle(flashsaleSwiper).left);



arrowBox.forEach((node,key) => {
  node.addEventListener("click", () => {
    const lt = parseInt(window.getComputedStyle(flashsaleSwiper).left);
    if(lt < 0) {
      arrowBox[1].classList.add("spandisabled");
      flashsaleSwiperNext();
    } else {
      arrowBox[0].classList.add("spandisabled");
      flashsaleSwiperPrev();
      
    }
  });
});

function flashsaleSwiperPrev() {
  interval(timeId => {
    const left = parseInt(window.getComputedStyle(flashsaleSwiper).left);
    flashsaleSwiper.style.left = left - 6 + "px"; 
    if (left <= -978) {
      clearInterval(timeId);
      arrowBox[1].classList.remove("spandisabled");
    }
  }, 10)
}

function flashsaleSwiperNext() {
  interval(timeId => {
    const left = parseInt(window.getComputedStyle(flashsaleSwiper).left);
    flashsaleSwiper.style.left = left + 6 + "px";
    if (left >= 0) {
      clearInterval(timeId);
      arrowBox[0].classList.remove("spandisabled");
    }
  }, 10)
}

function interval(callback, delay = 100) {
  let id = setInterval(() => callback(id), delay);
}


let hot = document.querySelectorAll(".xm-tv a");
let imgtv = document.querySelectorAll('.xm-tv img[alt="imgtv"]');
let texttv = document.querySelectorAll('.xm-tv h3');
let pricetv = document.querySelectorAll('.xm-tv p span');
let deltv = document.querySelectorAll('.xm-tv p del');


hot.forEach((node) => {
  hot[0].classList.add("hot");
  node.addEventListener("mouseenter", (e)=> {
    hot[0].classList.remove("hot");
    hot[1].classList.remove("hot");
    e.target.classList.add("hot");
    if(e.target.id == "a2") {
      imgtv.forEach(node=>{
        node.removeAttribute("src");
        node.setAttribute("src","./images/7e2127506fd2209f3115828404269d45.jpg");
      });
    } else {
      imgtv.forEach(node=>{
        node.removeAttribute("src");
        node.setAttribute("src","./images/03a9e7e96a09d256ca1badeec186c859.webp");
      });
    }
    if(e.target.id == "a2") {
      texttv.forEach(node=>{
        node.innerHTML = "小米电视4S 75英寸";
      });
    } else {
      texttv.forEach(node=>{
        node.innerHTML = "小米全面屏电视65英寸 E65X";
      });
    }
    if(e.target.id == "a2") {
      pricetv.forEach(node=>{
        node.innerHTML = "4199元";
      });
    } else {
      pricetv.forEach(node=>{
        node.innerHTML = "2799元"
      });
    }
    if(e.target.id == "a2") {
      deltv.forEach(node=>{
        node.innerHTML = "5999元"
      });
    } else {
      deltv.forEach(node=>{
        node.innerHTML = "3299元"
      });
    }
  });

});


let homeToolBar = document.querySelectorAll(".home-tool-bar img");
const arr = [
  "./images/74c4fcb4475af8308e9a670db9c01fdf.png",
  "./images/41f858550f42eb1770b97faf219ae215.png",
  "./images/95fbf0081a06eec7be4d35e277faeca0.png",
  "./images/5e9f2b1b0da09ac3b3961378284ef2d4.png",
  "./images/692a6c3b0a93a24f74a29c0f9d68ec71.png",
  "./images/totop_hover.png"
];
const arrs = [
  "./images/98a23aae70f25798192693f21c4d4039.png",
  "./images/55cad219421bee03a801775e7309b920.png",
  "./images/12eb0965ab33dc8e05870911b90f3f13.png",
  "./images/4f036ae4d45002b2a6fb6756cedebf02.png",
  "./images/d7db56d1d850113f016c95e289e36efa.png",
  "./images/totop.png"
];

console.dir(homeToolBar);

homeToolBar.forEach((node,key)=>{
  node.addEventListener("mouseenter",()=>{
    node.removeAttribute("src");
    node.setAttribute("src",arr[key]);
  });
  node.addEventListener("mouseleave",()=>{
    node.removeAttribute("src");
    node.setAttribute("src",arrs[key]);
  });
})

