Number.prototype.roundTo = function() { return Math.round(this * 10 ** arguments[0]) / 10 ** arguments[0]};
String.prototype.reverse = function() { return this.split('').reverse().join('')};
String.prototype.cut = function(n) { return n > 0 ? this.substring(n, this.length) : this.reverse().substring(-n, this.length).reverse()};
Array.prototype.clone = function() { return JSON.parse(JSON.stringify(this)); } 
Array.prototype.sum = function() { return this.reduce((e, i) => e + i)}; // needs rank polymorphism
Array.prototype.product = function() {return this.reduce((e, i) => e * i)};
Array.prototype.avg = function() { return this.reduce((e, i) => e + i) / this.length};
Array.prototype.min = function() { return Math.min(...this)};
Array.prototype.max = function() { return Math.max(...this)};
Array.prototype.minmax = function() { return [Math.min(...this), Math.max(...this)]}; //  inefficient 
Array.prototype.uniq = function() { return this.filter((e, i, a) => a.indexOf(e) === i)};
Array.prototype.xor = function () { return this.reduce((e, i) => e ^ i)}; // optional lambda implementation
Array.prototype.zip = function(arr) { return this.map((e, i) => [e, arr[i]])};
Array.prototype.count = function(arr) { // needs rank polymorphism
  if (typeof(arr) == 'string') arr = arr.split('');
  let result = [];
  for (i = 0; i < arr.length; i++) {
    result.push(this.map(e => e == arr[i]).reduce((a, b) => a + b));
  }
  return result;
};
Array.prototype.mapReduce = function(lambda, optional) { // check if nested array then this.map(e => e.reduce(optional)) also use sum()
  optional ??= (e, i) => e + i;
  return this.map(lambda).reduce(optional)
};
Array.prototype.rotate = function(n) { // APL port. needs refactoring
    let r = n % this.length;
    if (r < 0) r += this.length;
    return this.map((_, i) => {return this[(i + r) % this.length];}, this);
};
Array.prototype.scan = function(lambda) { // doesnt work on -\⍳5    1 ¯1 2 ¯2 3 needs rank polymorphism
  return this.map((_, i, a) => a.slice(0, i + 1).reduce(lambda));
};
Array.prototype.outerProduct = function(lambda, optional) { // APL port ∘.
  lambda ??= (e, i) => e + i;
  optional ??= this;
  if (typeof(optional) == 'string') optional = optional.split('');
  const matrix = [];
  for (let i = 0; i < optional.length; i++) {
    let arr = this.map(e => lambda(e, optional[i]));
    matrix.push(arr)
  }
  return matrix;
};
Array.prototype.zipWith = function(operation, arr) {
  arr ??= this;
  const length = this.length < arr.length ? arr.length : this.length; // smaller? bigger? only if equal length?
  const result = [];
  if (typeof(arr) == 'string') arr = arr.split('');
  for (let i = 0; i < length; i++) {
    result.push(operation(this[i], arr[i]));
  }
  return result;
};
Array.prototype.transpose = function() { // APL port ⍉
  let arr = [];
  for (let i = 0; i < this[0].length; i++) {
    arr[i] = [];
    for (let j = 0; j < this.length; j++) {
      arr[i][j] = this[j][i];
    }
  }
  return arr;
};
Array.iota = function(start, end, n) { // APL/C++/Haskell port
  n ??= 1;
  if (!end) {
    end = start;
    start = 1;
  }
  let arr = new Array((end - (start - 1)) / n);
  arr[0] = start;
  return arr.fill(0, 1).scan(e => e + n);
};
Object.prototype.includes = function(s, n) {
  if (this.hasOwnProperty(s)) {
    if (this[s] === n) {
      return true;
    }
  }
  for (let key in this) {
    if (typeof this[key] === 'object') {
      if ( this[key].includes(s, n)) return true;
    }
  }
  return false;
};
Function.prototype.flip = function(...args) { // Haskell port C combinator
  const fn = this;
  return args.length > 0 ? fn.apply(this, args.reverse()) : function(...args) { return fn.apply(this, args.reverse()) };
};
const _plus = (e, i) => e + i;
const _minus = (e, i) => e - i;
const _equals = (e, i) => e == i;
const _strictEquals = (e, i) => e === i;
const _notEquals = (e, i) => e != i;
const _strictNotEquals = (e, i) => e !== i;
const _and = (e, i) => e && i;
const _or = (e, i) => e || i;
const _power = (e, i) => e ** i;
const _multiplies = (e, i) => e * i;
const _divides = (e, i) => e / i;
const _modulus = (e, i) => e % i;
const _max = (e, i) => Math.max(e, i);
const _min = (e, i) => Math.min(e, i);
const _diff = _minus.flip();
const _diffAbs = (e, i) => Math.abs(e - i);
const _less = (e, i) => e < i;
const _lessEquals = (e, i) => e <= i;
const _greater = (e, i) => e > i;
const _greaterEquals = (e, i) => e >= i;
