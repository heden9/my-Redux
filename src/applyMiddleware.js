import { compose } from './utils/compose';
/**
 * 中间件
 * middleware = ({ getState, dispatch }) => (next) => (action) => next(action)
 * 
 * @param {Array} middlewares 引入中间件
 */
export function applyMiddleware(middlewares) {
  if (!middlewares instanceof Array){
    throw new Error('Expected middlewares to be a array.')
  }
  return (createStore) => (...arg) => {
    let store = createStore(...arg);
    let chain = []; // 中间件创建完成后的链子
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const middlewareAPIs = {
      getState: store.getState,
      dispatch: (...arg) => dispatch(...arg)
    }

    chain = middlewares.map(item => item(middlewareAPIs));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    }
  }
}