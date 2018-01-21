/**
 * 从右向左执行
 * @param {Function} funcs 
 */
export function compose(...funcs) {
  if (funcs.length === 0){
    return arg => arg
  }
  if (funcs.length === 1){
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...arg) => a(b(...arg)))
}


