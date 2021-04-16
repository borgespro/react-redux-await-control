import { combineReducers, createStore, Store } from 'redux';

import createAsyncAction from '../src/createAsyncAction';
import { reducer } from '../src';

export function createTestStore(): Store {
  return createStore(
    combineReducers({
      control: reducer,
    }),
  );
}

describe('Testing integration with redux', () => {
  const fetchTodosActionName = 'FETCH_TODOS';
  const fetchTodosAction = createAsyncAction(fetchTodosActionName);
  const removeTodoActionName = 'REMOVE_TODO';
  const removeTodoAction = createAsyncAction(removeTodoActionName);

  describe('async actions valid flux', () => {
    let store;
    const meta = { awaitId: 1 };

    beforeEach(() => {
      store = createTestStore();
      store.dispatch(fetchTodosAction.start());
      store.dispatch(removeTodoAction.start(true, meta));
    });

    it('verify is starting with START status', () => {
      expect(store.getState().control[fetchTodosActionName]).toBeDefined();
      expect(store.getState().control[fetchTodosActionName]).toEqual('START');
      expect(store.getState().control[`${removeTodoActionName}_${meta.awaitId}`]).toBeDefined();
      expect(store.getState().control[`${removeTodoActionName}_${meta.awaitId}`]).toEqual('START');
    });

    it('create user case with fetch result success.', () => {
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toEqual('SUCCESS');
      store.dispatch(removeTodoAction.success(true, meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.awaitId}`]).toEqual('SUCCESS');
    });

    it('create user case with fetch result cancel.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toEqual('CANCEL');
      store.dispatch(removeTodoAction.cancel(meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.awaitId}`]).toEqual('CANCEL');
    });

    it('create user case with fetch result failure.', () => {
      store.dispatch(fetchTodosAction.failure(new Error()));
      expect(store.getState().control[fetchTodosActionName]).toEqual('FAILURE');
      store.dispatch(removeTodoAction.failure(new Error(), meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.awaitId}`]).toEqual('FAILURE');
    });
  });

  describe('async actions invalid flux', () => {
    let store;

    beforeEach(() => {
      store = createTestStore();
    });

    it('trying a more completed flux', () => {
      store.dispatch(fetchTodosAction.start());
      expect(store.getState().control[fetchTodosActionName]).toBeDefined();
      expect(store.getState().control[fetchTodosActionName]).toEqual('START');
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.start());
      expect(store.getState().control[fetchTodosActionName]).toEqual('START');
    });

    it('trying set SUCCESS in state.', () => {
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
    });

    it('trying set CANCEL in state.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
    });

    it('trying set FAILURE in state.', () => {
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
    });
  });
});
