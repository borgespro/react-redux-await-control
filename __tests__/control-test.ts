import createAsyncAction from '../src/createAsyncAction';
import AwaitControl from '../src';
import createTestStore from './utils/createTestStore';

describe('Testing integration with redux', () => {
  AwaitControl.init({ keyReducer: 'control' });
  const fetchTodosActionName = 'FETCH_TODOS';
  const fetchTodosAction = createAsyncAction(fetchTodosActionName);
  const removeTodoActionName = 'REMOVE_TODO';
  const removeTodoAction = createAsyncAction(removeTodoActionName);

  describe('async actions valid flux', () => {
    let store;
    const meta = { actionId: 1 };

    beforeEach(() => {
      store = createTestStore();
      store.dispatch(fetchTodosAction.start());
      store.dispatch(removeTodoAction.start(true, meta));
    });

    it('verify is starting with START status', () => {
      expect(store.getState().control[fetchTodosActionName]).toBeDefined();
      expect(store.getState().control[fetchTodosActionName]).toEqual('START');
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toBeDefined();
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toEqual('START');
      expect(fetchTodosAction.isRunning()(store.getState())).toBe(true);
      expect(removeTodoAction.isRunning()(store.getState())).toEqual(false);
      expect(removeTodoAction.isRunning(1)(store.getState())).toEqual(true);
    });

    it('create user case with fetch result success.', () => {
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toEqual('SUCCESS');
      store.dispatch(removeTodoAction.success(true, meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toEqual('SUCCESS');
      expect(fetchTodosAction.isSuccessful()(store.getState())).toBe(true);
      expect(removeTodoAction.isSuccessful()(store.getState())).toEqual(false);
      expect(removeTodoAction.isSuccessful(1)(store.getState())).toEqual(true);
    });

    it('create user case with fetch result cancel.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toEqual('CANCEL');
      store.dispatch(removeTodoAction.cancel(meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toEqual('CANCEL');
      expect(fetchTodosAction.isCancelled()(store.getState())).toBe(true);
      expect(removeTodoAction.isCancelled()(store.getState())).toEqual(false);
      expect(removeTodoAction.isCancelled(1)(store.getState())).toEqual(true);
    });

    it('create user case with fetch result failure.', () => {
      store.dispatch(fetchTodosAction.failure(new Error()));
      expect(store.getState().control[fetchTodosActionName]).toEqual('FAILURE');
      store.dispatch(removeTodoAction.failure(new Error(), meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toEqual('FAILURE');
      expect(fetchTodosAction.hasFailure()(store.getState())).toBe(true);
      expect(removeTodoAction.hasFailure()(store.getState())).toEqual(false);
      expect(removeTodoAction.hasFailure(1)(store.getState())).toEqual(true);
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
      expect(removeTodoAction.isSuccessful()(store.getState())).toEqual(false);
    });

    it('trying set CANCEL in state.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      expect(removeTodoAction.isCancelled()(store.getState())).toEqual(false);
    });

    it('trying set FAILURE in state.', () => {
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      expect(removeTodoAction.hasFailure()(store.getState())).toEqual(false);
    });
  });
});
