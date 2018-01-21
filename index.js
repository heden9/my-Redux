import { createStore, combineReducer, applyMiddleware } from './src/index';

const reducer1 = (state, action) => {
  console.log(1)
  switch(action.type){
    case 'ADD': return { ...state, count: state.count + 1  };
    case 'REDUCE': return { ...state, count: state.count - 1 };
    default: return { ...state };
  }
}

const reducer2 = (state, action) => {
  switch(action.type) {
    case 'DIV': return { ...state, count: state.count / 2 }
    default: return { ...state };
  }
}
const logger = ({ getState, dispatch }) => (next) => (action) => {
  console.log('prev state', getState())
  const res = next(action);
  console.log('next state', getState())
}
const logger2 = ({ getState, dispatch }) => (next) => (action) => {
  console.log('%chh', 'font-size:100px;width:130px; height:130px; border:2px solid black; padding: 10px;background: -webkit-gradient(linear, left top, left bottom, from(#00abeb), to(#fff)); -webkit-background-origin: padding; -webkit-background-clip: content;')
  const res = next(action);
  console.log('%chh', 'font-size:100px;width:130px; height:130px; border:2px solid black; padding: 10px;background: -webkit-gradient(linear, left top, left bottom, from(#00abeb), to(#fff)); -webkit-background-origin: padding; -webkit-background-clip: content;')
}
const store = createStore(combineReducer([reducer1, reducer2]), {
  count: 0
}, applyMiddleware([logger, logger2]))


store.dispatch({ type: 'ADD' })

store.dispatch({ type: 'DIV' })