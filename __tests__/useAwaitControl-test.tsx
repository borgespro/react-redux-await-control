import * as React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import createTestStore from './utils/createTestStore';
import AwaitControl, { useAwaitControl, createAsyncAction } from '../src';

describe('Testing useAwaitControl', () => {
  AwaitControl.init({ keyReducer: 'control' });
  let store;
  let control;
  const fetchTodosAction = createAsyncAction('FETCH_TODOS', { saveResult: true });

  const addTodoAction = createAsyncAction('ADD_TODO', { saveResult: true });
  const editTodoAction = createAsyncAction('EDIT_TODO', { saveResult: true });
  const removeTodoAction = createAsyncAction('REMOVE_TODO', { saveResult: true });

  const renderHookWrapper = (fn) => {
    renderHook(fn, { wrapper: (props) => <Provider {...props} store={store} /> });
  };

  beforeEach(() => {
    store = createTestStore();
    const { result } = renderHook(() => useAwaitControl(fetchTodosAction), {wrapper: (props) => <Provider {...props} store={store} />,});

    control = result.current;
  });

  it('validate control object', () => {
    expect(control.start).toBeDefined();
    expect(control.success).toBeDefined();
    expect(control.cancel).toBeDefined();
    expect(control.failure).toBeDefined();
    expect(control.clear).toBeDefined();
    expect(control.result).toBeDefined();
    expect(control.isRunning).toBeDefined();
    expect(control.wasCancelled).toBeDefined();
    expect(control.hasFailure).toBeDefined();
    expect(control.isSuccessful).toBeDefined();
  });

  it('validate start', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
    });

    expect(fetchTodosAction.isRunning()(store.getState())).toBe(true);
  });

  it('validate start with parameters', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start(1, { actionId: 1 });
    });

    expect(fetchTodosAction.isRunning(1)(store.getState())).toBe(true);
  });

  it('validate cancel', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.cancel();
    });

    expect(fetchTodosAction.wasCancelled()(store.getState())).toBe(false);

    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
      fetchTodosControl.cancel();
    });

    expect(fetchTodosAction.wasCancelled()(store.getState())).toBe(true);
  });

  it('validate cancel with parameters', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start(1, { actionId: 1 });
      fetchTodosControl.cancel(1, { actionId: 1 });
    });

    expect(fetchTodosAction.wasCancelled(1)(store.getState())).toBe(true);
  });

  it('validate success', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.success('OK');
    });

    expect(fetchTodosAction.isSuccessful()(store.getState())).toBe(false);
    expect(fetchTodosAction.getResult()(store.getState())).toBeUndefined();

    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
      fetchTodosControl.success('OK');
    });

    expect(fetchTodosAction.isSuccessful()(store.getState())).toBe(true);
    expect(fetchTodosAction.getResult()(store.getState())).toBe('OK');
  });

  it('validate success with parameters', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start(1, { actionId: 1 });
      fetchTodosControl.success('OK', { actionId: 1 });
    });

    expect(fetchTodosAction.isSuccessful(1)(store.getState())).toBe(true);
    expect(fetchTodosAction.getResult(1)(store.getState())).toBe('OK');
  });

  it('validate failure', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.failure();
    });

    expect(fetchTodosAction.hasFailure()(store.getState())).toBe(false);
    expect(fetchTodosAction.getResult()(store.getState())).toBeUndefined();

    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
      fetchTodosControl.failure('ERROR');
    });

    expect(fetchTodosAction.hasFailure()(store.getState())).toBe(true);
    expect(fetchTodosAction.getResult()(store.getState())).toBe('ERROR');
  });

  it('validate failure with parameters', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start(1, { actionId: 1 });
      fetchTodosControl.failure('ERROR', { actionId: 1 });
    });

    expect(fetchTodosAction.hasFailure(1)(store.getState())).toBe(true);
    expect(fetchTodosAction.getResult(1)(store.getState())).toBe('ERROR');
  });

  it('validate clear', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
      fetchTodosControl.clear();
    });

    expect(fetchTodosAction.isRunning()(store.getState())).toBe(false);

    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start();
      fetchTodosControl.clear();
    });

    expect(fetchTodosAction.isRunning()(store.getState())).toBe(false);
  });

  it('validate clear with parameters', () => {
    renderHookWrapper(() => {
      const fetchTodosControl = useAwaitControl(fetchTodosAction);
      fetchTodosControl.start(1, { actionId: 1 });
      fetchTodosControl.clear({ actionId: 1 });
    });

    expect(fetchTodosAction.isRunning(1)(store.getState())).toBe(false);
  });

  it('validate hook for multiples controls', () => {
    renderHookWrapper(() => {
      const [addTodoControl, editTodoControl, removeTodoControl] = useAwaitControl([
        addTodoAction, editTodoAction, removeTodoAction,
      ]);

      addTodoControl.start();
      editTodoControl.start();
      removeTodoControl.start();
    });

    expect(addTodoAction.isRunning()(store.getState())).toBeTruthy();
    expect(editTodoAction.isRunning()(store.getState())).toBeTruthy();
    expect(removeTodoAction.isRunning()(store.getState())).toBeTruthy();

    renderHookWrapper(() => {
      const [addTodoControl, editTodoControl, removeTodoControl] = useAwaitControl([
        addTodoAction, editTodoAction, removeTodoAction,
      ]);

      addTodoControl.start();
      addTodoControl.success();
      editTodoControl.start();
      editTodoControl.success();
      removeTodoControl.start();
      removeTodoControl.success();
    });

    expect(addTodoAction.isSuccessful()(store.getState())).toBeTruthy();
    expect(editTodoAction.isSuccessful()(store.getState())).toBeTruthy();
    expect(removeTodoAction.isSuccessful()(store.getState())).toBeTruthy();
  });
});
