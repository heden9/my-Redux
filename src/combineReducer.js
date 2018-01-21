import { compose } from './utils/compose';
import { curryRight } from './utils';
/**
 * (prevState, action) => nextState
 * @param {array[funcs]} reducers 
 */
export function combineReducer(reducers){
   if (!reducers instanceof Array){
     throw new Error('reducers need array')
   }
   
   return (state, action) => {
     return compose(...reducers.map(item => curryRight(item, action)))(state);
   }
}


