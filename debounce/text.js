"use strict";

window.onload = show;

function debounce(callback, delay = 1000) {
  let timeout = null;
  return (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(e);
    }, delay);
  };
}

let imgs = document.querySelectorAll("img");
let btn = document.querySelectorAll("button");
let count = 0;

let a = debounce(e => {
  imgs.forEach(node => {
    node.className = "";
  });
  e.target.className == "prev" ? count++ : count--;
  if (count > 2) {
    count = 0;
  } else if(count < 0) {
    count = 2;
  }
  imgs[count].className = "opcity";
  console.log(count);
},1000);

function show() {
  btn.forEach(node => {
    node.addEventListener("click", a, false);

  });
}
