var joezhoux = {
  _isLength: function (val) {
    return typeof val == "number" && val > -1;
  },
  _isObject: function (val) {
    return val != null && (typeof val == "object" || typeof val == "function");
  },
  _isFunction: function (val) {
    return val != null && typeof val == "function";
  },
  _isArrayLike: function (val) {
    return val != null && this._isLength(val.length) && !this._isFunction(val);
  },
  _identity: function (val, e) {
    if (typeof (e) == "function") {
      return e(val);
    } else if (typeof (e) == "string") {
      return val[e];
    }
  },
  //****************************************************************
  chunk: function (array, size = 1) {
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
  difference: function (array, ...diff) {
    if (!diff) return array;
    let rules = diff.reduce((acc, curr) => acc.concat(curr))

    let len = array == null ? 0 : array.length;
    let result = [];

    for (let i = 0; i < len; i++) {
      if (rules.indexOf(array[i]) == -1) {
        result.push(array[i]);
      }
    }
    return result;
  },
  differenceBy: function (array, ...diff) {

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
  flattenDeep: function (array) {
    let ans = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i] instanceof Array) {
        ans.push(...this.flattenDeep(array[i]));
      } else ans.push(array[i]);
    }
    return ans;
  },
  flattenDepth: function (array, depth = 1) {
    let ans = [];
    let d = depth;

    for (let i = 0; i < array.length; i++) {
      if (depth && array[i] instanceof Array) {
        d--;
        ans.push(...this.flattenDepth(array[i], d));
      } else {
        ans.push(array[i]);
        d = depth;
      }
    }
    return ans;
  },
  groupBy: function (array, fuc) {
    let ans = {};

    if (typeof fuc == "function") {
      array.map(el => {
        if (!ans.hasOwnProperty(fuc(el))) {
          ans[fuc(el)] = [];
        }
        ans[fuc(el)].push(el);
      });
    } else if (fuc == "length") {
      array.map(el => {
        if (!ans.hasOwnProperty(el.length)) {
          ans[el.length] = [];
        }
        ans[el.length].push(el);
      });
    }
    return ans;
  },
  keyBy: function (array, fuc) {
    let ans = {};

    if (typeof fuc == "function") {
      array.map(el => {
        if (!ans.hasOwnProperty(fuc(el))) {
          ans[fuc(el)] = [];
        }
        ans[fuc(el)].push(el);
      });
    } else if (typeof fuc == "string") {
      array.map(el => {
        if (!ans.hasOwnProperty(el[fuc])) {
          ans[el[fuc]] = [];
        }
        ans[el[fuc]].push(el);
      });
    }
    for (k in ans) {
      if (ans[k].length == 1) {
        ans[k] = ans[k][0];
      }
    }
    return ans;
  },
  forEach: function (array, fuc) {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        fuc(array[i]);
      }
    } else {
      for (let k in array) {
        if (array.hasOwnProperty(k)) {
          fuc(array[k], k);
        }
      }
    }
  },
  map: function (array, fuc) {
    let ans = [];
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        if (typeof fuc == "string") {
          ans.push(array[i][fuc]);
        } else {
          ans.push(fuc(array[i]));
        }
      }
    } else {
      for (let k in array) {
        if (array.hasOwnProperty(k)) {
          ans.push(fuc(array[k], k));
        }
      }
    }
    return ans;
  },
  filter: function (array, f) {
    let ans = [];
    if (this._isFunction(f)) {
      for (let i = 0; i < array.length; i++) {
        if(fuc(array[i])) {
          ans.push(array[i]);
        }
      }
    } else if (xxx) {
      xxx;
    }
  },

}


// filter, reduce, zip, unzip
// keys, values,reverse, countBy,reduceRight,shuffle,
// isNaN, isNull, isNil, isUndefined, toArray, sum, sumBy 
// every, some, fill
// sortBy
// isEqual
