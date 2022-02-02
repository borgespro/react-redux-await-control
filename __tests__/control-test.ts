import createAsyncAction from '../src/createAsyncAction';
import AwaitControl from '../src';
import createTestStore from './utils/createTestStore';

describe('Testing integration with redux', () => {
  AwaitControl.init({ keyReducer: 'control' });
  const fetchTodosActionName = 'FETCH_TODOS';
  const fetchTodosAction = createAsyncAction(fetchTodosActionName, { saveResult: true });
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
      expect(store.getState().control[fetchTodosActionName][0]).toBeDefined();
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('START');
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`]).toBeDefined();
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`][0]).toEqual('START');
      expect(fetchTodosAction.isRunning()(store.getState())).toBe(true);
      expect(removeTodoAction.isRunning()(store.getState())).toEqual(false);
      expect(removeTodoAction.isRunning(1)(store.getState())).toEqual(true);
    });

    it('create use case with fetch result success.', () => {
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('SUCCESS');
      store.dispatch(removeTodoAction.success(true, meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`][0]).toEqual('SUCCESS');
      expect(fetchTodosAction.isSuccessful()(store.getState())).toBe(true);
      expect(removeTodoAction.isSuccessful()(store.getState())).toEqual(false);
      expect(removeTodoAction.isSuccessful(1)(store.getState())).toEqual(true);
    });

    it('create use case with fetch result cancel.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('CANCEL');
      store.dispatch(removeTodoAction.cancel(meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`][0]).toEqual('CANCEL');
      expect(fetchTodosAction.wasCancelled()(store.getState())).toBe(true);
      expect(removeTodoAction.wasCancelled()(store.getState())).toEqual(false);
      expect(removeTodoAction.wasCancelled(1)(store.getState())).toEqual(true);
    });

    it('create use case with fetch result failure.', () => {
      store.dispatch(fetchTodosAction.failure(new Error()));
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('FAILURE');
      store.dispatch(removeTodoAction.failure(new Error(), meta));
      expect(store.getState().control[`${removeTodoActionName}_${meta.actionId}`][0]).toEqual('FAILURE');
      expect(fetchTodosAction.hasFailure()(store.getState())).toBe(true);
      expect(removeTodoAction.hasFailure()(store.getState())).toEqual(false);
      expect(removeTodoAction.hasFailure(1)(store.getState())).toEqual(true);
    });

    it('create use case for calling clear action.', () => {
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('START');
      store.dispatch(fetchTodosAction.clear());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
    });

    it('create use case to get result.', () => {
      store.dispatch(fetchTodosAction.success({ validation: true }));
      expect(store.getState().control[fetchTodosActionName][1].validation).toBeTruthy();
      store.dispatch(fetchTodosAction.success({ validation: false }));
      expect(store.getState().control[fetchTodosActionName][1].validation).toBeFalsy();
    });

    it('create use case to keep first result when second start action is dispatched.', () => {
      store.dispatch(fetchTodosAction.success([{ id: 1 }, { id: 2 }]));
      const first = fetchTodosAction.getResultValue(store.getState());
      store.dispatch(fetchTodosAction.start());
      const second = fetchTodosAction.getResultValue(store.getState());
      expect(first).toEqual(second);
    });
  });

  describe('async actions invalid flux', () => {
    let store;

    beforeEach(() => {
      store = createTestStore();
    });

    it('trying a more completed flux', () => {
      store.dispatch(fetchTodosAction.start());
      expect(store.getState().control[fetchTodosActionName][0]).toBeDefined();
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('START');
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('FAILURE');
      store.dispatch(fetchTodosAction.start());
      expect(store.getState().control[fetchTodosActionName][0]).toEqual('START');
    });

    it('trying set SUCCESS in state.', () => {
      store.dispatch(fetchTodosAction.success());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      expect(removeTodoAction.isSuccessful()(store.getState())).toEqual(false);
    });

    it('trying set CANCEL in state.', () => {
      store.dispatch(fetchTodosAction.cancel());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      expect(removeTodoAction.wasCancelled()(store.getState())).toEqual(false);
    });

    it('trying set FAILURE in state.', () => {
      store.dispatch(fetchTodosAction.failure());
      expect(store.getState().control[fetchTodosActionName]).toBeUndefined();
      expect(removeTodoAction.hasFailure()(store.getState())).toEqual(false);
    });
  });
});
