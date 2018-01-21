export function map(){
  /**
   * 模拟数组map方法
   * @param {func} callback 
   * @param {obj} context 
   */
  Array.prototype.map = function(callback, context){
    if (!this instanceof Array){
      throw new Error('need array')
    }
    var nextArr = [];
    callback = callback || function(){}
    for(var i = 0; i < this.length; i++){
      var item = this[i];
      nextArr.push(callback.call(context, item, i, this));
    }
    return nextArr;
  }
}

export function reduce(){
  /**
   * 模拟数组reduce方法
   * @param {func} callback 
   * @param {any} initialVal 初始值
   */
  Array.prototype.reduce = function(callback, initialVal){
    if (!this instanceof Array){
      throw new Error('need array')
    }
    if (!callback instanceof Function){
      throw new Error('need function')
    }
    if (this.length === 0 && initialVal == null){
      throw new Error('array is not empty or initialVal also')
    }
    var sum = initialVal || this[0];    
    if (this.length === 0){
      return sum;
    }
    for(var i = 1; i < this.length; i++){
      var item = this[i];
      sum = callback(sum, item, i, this)
    }
    return sum;
  }
}

/**
 * 
 * @param {func} reduce 用于修改数组的方法，
 */
function createCurry(reduce){
  reduce = reduce || function(x){ return x }
  return function curry(fn){
    if (!fn instanceof Function){
      throw new Error('fn need function!')
    }
    let outerArgs = Array.prototype.slice.call(arguments, 1);
    let len = fn.length;
    function getCurry(sum){
      return function(){
        let innerArgs = Array.prototype.slice.call(arguments);
        let args = sum.concat(innerArgs);
        if (args.length === len){
          return fn.apply(this, reduce(args));
        }
        return getCurry(args);
      }
    }
    return getCurry(outerArgs)
  }
}
/**
 * 从左向右柯里化
 */
export const curry = createCurry();

/**
 * 从右向左柯里化
 */
export const curryRight = createCurry(function(arg) {
  return arg.reverse();
})

/**
 * 限制传入函数的参数个数
 * @param {func} fn 
 * @param {int} number 
 */
export function arg(fn, number) {
  return function(){
    let arg = Array.prototype.slice.call(arguments, 0, number)
    return fn.apply(this, arg);
  }
}

