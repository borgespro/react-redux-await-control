import { Action } from 'redux-actions';

import { AsyncActionReducer } from './types';

export default function reducer(state: AsyncActionReducer, action: Action<any>): AsyncActionReducer {
  console.warn(action);
  return state;
}
