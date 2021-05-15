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

## API Reference

### AwaitControl

| Method     | Parameters                       | Return Type       | Description                                                                       |
| ---------- | -------------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| init       | config?: AwaitControlInitializer | AwaitControl      | Initialize the library                                                            |
| getControl | -                                | AwaitControl      | Get the AwaitControl single object                                                |
| mix        | reducers: ReducersMapObject      | ReducersMapObject | combines the reducers of the project with the reducer that belongs to the library |

#### AwaitControlInitializer

| Property   | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| keyReducer | String | Change the default keyReducer |

### AsyncActionControl

| Method  | Parameters | Return Type | Description |
| ------- | ---------- | ----------- | ----------- |
| start   |            |             |             |
| cancel  |            |             |             |
| success |            |             |             |
| failure |            |             |             |
| clear   |            |             |             |

| Property | Type | Description |
| -------- | ---- | ----------- |
| label    |      |             |
| rawKey   |      |             |

### AwaitControlHook

| Method       | Parameters | Return Type | Description |
| ------------ | ---------- | ----------- | ----------- |
| start        |            |             |             |
| cancel       |            |             |             |
| success      |            |             |             |
| failure      |            |             |             |
| clear        |            |             |             |
| isRunning    |            |             |             |
| isCancelled  |            |             |             |
| hasFailure   |            |             |             |
| isSuccessful |            |             |             |

## License

[MIT](LICENSE)
