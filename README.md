# React Redux Await Control

[![npm version](https://img.shields.io/npm/v/react-redux-await-control.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-await-control)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-await-control.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-await-control)

Working with redux can be very verbose. `React Redux Await Control` intends to help you deal with it.

## Installation

```bash
# If you use npm:
npm i react-redux-await-control

# Or if you use Yarn:
yarn add react-redux-await-control
```

## Usage

#### `reducers.js`

```bash
import { combineReducers } from 'redux';
import AwaitControl from 'react-redux-await-control';

import authReducer from './auth';
import todoReducer from './todo';

const reducers = AwaitControl.init().mix({
  authReducer,
  todoReducer,
});

export default combineReducers({ ...reducers });
```

#### `action.js`

```bash
...
import { createAsyncAction } from 'react-redux-await-control';
...

export const removeTodo = createAsyncAction('REMOVE_TODO');
# in this way the information passed by parameters on success or failure is saved.
export const listTodo = createAsyncAction('LIST_TODO', { saveResult: true });
```

#### `component.js`

```bash
import React, { useEffect } from 'react';
import { useAwaitControl } from 'react-redux-await-control';
...
import { listTodos } from '../store/action';

export default function Component() {
  const listTodosControl = useAwaitControl(listTodos);

  useEffect(() => {
    listTodosControl.start();
    return () => listTodosControl.cancel();
  }, []);

  if (listTodosControl.isRunning()) {
    return <Loading />;
  }

  if (listTodosControl.hasFailure()) {
    return <Error />;
  }

  return (
    <List>
       {
          listTodosControl.result().map(
            todo => <Item key={todo.id} data={todo} />
          )
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
| result       |            |             |             |
| isRunning    |            |             |             |
| wasCancelled |            |             |             |
| hasFailure   |            |             |             |
| isSuccessful |            |             |             |

## License

[MIT](LICENSE)
