import { combineReducers, createStore, Store } from 'redux';

import { reducer } from '../../src';

export default function createTestStore(): Store {
  return createStore(combineReducers({ control: reducer }));
}
