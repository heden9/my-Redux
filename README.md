## my-Redux

最近没啥事，自己简单实现了一个redux的简易版，源码中有很多错误处理，我只写了部分..🔥


在`combineReduce`处是自己的实现，使用了函数式编程中的思想

因为所有的`dispatch`都是一下这种格式

```javascript
  (prevState, action) => (nextState)
```

而且在同一个应用中不可能出现两个同样的`action`，所以我们可以将`dispatch`柯里化后
缓存入`action`

```javascript
  
  const curriedReduces = reduces.map(reduc => curryRight(reduc, action));
  const nextReduce = compose(...curriedReduces)
```

同样可以实现`state`的准确更新

另外，redux中十分精彩的是`applyMiddleware`的实现

先来看下`middleware`的格式

```javascript
  ({ getState, dispatch }) => (next) => (action) => next(action)
```

再来看一段code

```javascript
  const reducer = (state) => {console.log(1) return state};
  const m1 = () => next => action => {
    console.log(2);
    const res = next(action);
    console.log(3);
  }
  const m2 = () => next => action => {
    console.log(4);
    const res = next(action);
    console.log(5);
  }
  const store = createStore(reducer, applyMiddleware([m1, m2]))
```

`next`是下一个`middleWare`的函数体

```javascript
  next_m1: f m2
  next_m2: f dispatch
```

输出顺序为
```javascript
  2 4 1 5 3
```