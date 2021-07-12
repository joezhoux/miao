"use strict";

var joezhoux = {
  _identity: function (val, e) {
    if (typeof(e) == "function") {
      return e(val);
    } else if (typeof(e) == "string") {
      return val[e];
    }
  },
  chunk: function (array, size=1) {
    if (size < 1) return [];

    let len = array == null ? 0 : array.length;
    let result = Array(Math.ceil(len / size));
    let index = 0;
    let arr = [];

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < size; j++) {
        arr.push(array[index]);
        index++;
        if (index === len) break;
      }
      result[i] = arr;
      arr = [];
    }
    return result;
  },
  compact: function (array) {
    let len = array == null ? 0 : array.length;
    let result = [],
      index = 0;

    array.forEach(el => {
      if (el) {
        result[index++] = el;
      }
    });
    return result;
  },
  difference: function (array, diff) {
    if (!diff) return array;

    let len = array == null ? 0 : array.length;
    let result = [];

    for (let i = 0; i < len; i++) {
      if (diff.indexOf(array[i]) == -1) {
        result.push(array[i]);
      }
    }
    return result;
  },
  differenceBy: function (array, diff, iteratee) {

  },
  uniq: function (array) {
    let len = array == null ? 0 : array.length;
    let ans = [];

    for (let i = 0; i < len; i++) {
      if (!ans.includes(array[i])) {
        ans.push(array[i]);
      }
    }
    return ans;
  },
  uniqBy: function (array, iteratee) {
    let len = array == null ? 0 : array.length;
    let ans = [];
    let arr = [];
    let a = [];

    arr = array.map(el => this._identity(el, iteratee));
    for (let i = 0; i < len; i++) {
      if (ans.indexOf(arr[i]) == -1) {
        ans.push(arr[i]);
        a.push(i);
      }
    }
    ans = [];
    while (a.length) {
      ans.push(array[a.shift()]);
    }
    return ans;
  },

}


console.log(joezhoux.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x'));
