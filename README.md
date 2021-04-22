# React Redux Await Control

[![npm version](https://img.shields.io/npm/v/react-redux-await-control.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-await-control)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-await-control.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-await-control)

## Installation

```bash
# If you use npm:
npm i react-redux-await-control

# Or if you use Yarn:
yarn add react-redux-await-control
```

## Usage

#### `app.js`

```bash
...
import AwaitControl from 'react-redux-await-control';
...

const store = createStore(
  AwaitControl.init().mix(reducers),
  applyMiddleware(sagaMiddleware),
);
```

#### `action.js`

```bash
...
import { createAsyncAction } from 'react-redux-await-control';
...

export const removeTodo = createAsyncAction('REMOVE_TODO');
```

#### `component.js`

```bash
import React, { useEffect } from 'react';
import { useAwaitControl } from 'react-redux-await-control';
...
import { listTodos } from '../store/action';
import { getTodos } from '../store/selectors';

export default function Component() {
  const todos = useSelector(getTodos);

  const listTodosControl = useAwaitControl(listTodos);

  useEffect(() => {
    listTodosControl.start();
    return () => listTodosControl.cancel();
  }, []);

  if (listTodosControl.isRunning()) {
    return <Loading />;
  }

  return (
    <List>
       {
          todos.map(todo => <Item key={todo.id} data={todo} />)
       }
    </List>
  );
}

```

## Reference API

### AwaitControl

| Property | Type | Return Type | Description |
| -------- | ---- | ----------- | ----------- |
|          |      |             |             |

### AsyncActionControl

| Property | Type | Return Type | Description |
| -------- | ---- | ----------- | ----------- |
|          |      |             |             |

### AwaitControlHook

| Property | Type | Return Type | Description |
| -------- | ---- | ----------- | ----------- |
|          |      |             |             |

## License

[MIT](LICENSE)
