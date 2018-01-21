
/**
 * 创建store
 * @param {func} reducer 
 * @param {object} initialState 
 * @param {*} enhancer 
 */
export function createStore(reducer, initialState, enhancer){

  /**
   * createStore(reducer, applyMiddleware()) 调用方式
   */
  if (initialState instanceof Function && enhancer === undefined){
    enhancer = initialState;
    initialState = undefined;
  }

  if (enhancer !== undefined){
    if (!enhancer instanceof Function){
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, initialState);
  }

  let currentState = initialState;
  let currentReducer = reducer;
  let currentListeners = [];
  let nextListeners = currentListeners;

  function changeListeners(){
    if (nextListeners === currentListeners){
      nextListeners = currentListeners.slice(); 
    }
  }
  /**
   * 获取state
   */
  function getState(){
    return currentState;
  }
  /**
   * 触发更新state
   * @param {object} action 
   */
  function dispatch(action){
    currentState = currentReducer(currentState, action);
    const listener = (currentListeners = nextListeners);
    listener.forEach(item => item())
    return action;
  }
  /**
   * 订阅
   * @param {func} listener 
   */
  function subscribe(listener){
    let isSubscribed = true; // 函数是否被监听

    changeListeners();
    nextListeners.push(listener);
    return function unSubscribe(){
      if (!isSubscribed){ // 函数未被监听
        return;
      }

      isSubscribed = false;

      /**
       * 从nextListeners中删除已监听的函数
       */
      const index = nextListeners.indexOf(listener); 
      nextListeners.splice(index, 1)
    }
  }
  return {
    getState,
    dispatch,
    subscribe,
  }
}