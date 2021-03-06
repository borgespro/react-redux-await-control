import createAsyncAction from '../src/createAsyncAction';
import AwaitControl from '../src';
import createTestStore from './utils/createTestStore';

describe('Testing AsyncActionControl', () => {
  const asyncAction = createAsyncAction('REMOVE_ITEM', { prefix: 'TEXT_PREFIX', saveResult: true });
  const asyncActionWithInitialValue = createAsyncAction('LIST_ITEMS', { saveResult: true, initialValue: [] });

  it('label validation', () => {
    expect(asyncAction.label).toEqual('TEXT_PREFIX/REMOVE_ITEM');
    expect(asyncActionWithInitialValue.label).toEqual('ASYNC_ACTION/LIST_ITEMS');
  });

  it('toString validation', () => {
    expect(asyncAction.start.toString()).toEqual('TEXT_PREFIX/REMOVE_ITEM_START');
    expect(asyncAction.success.toString()).toEqual('TEXT_PREFIX/REMOVE_ITEM_SUCCESS');
    expect(asyncAction.failure.toString()).toEqual('TEXT_PREFIX/REMOVE_ITEM_FAILURE');
    expect(asyncAction.clear.toString()).toEqual('TEXT_PREFIX/REMOVE_ITEM_CLEAR');
    expect(asyncAction.cancel.toString()).toEqual('TEXT_PREFIX/REMOVE_ITEM_CANCEL');
  });

  it('getKey validation', () => {
    expect(asyncAction.getKey()).toEqual('REMOVE_ITEM');
    expect(asyncAction.getKey(999)).toEqual('REMOVE_ITEM_999');
  });

  it('getStateValue validation', () => {
    const store = createTestStore();
    AwaitControl.init({ keyReducer: 'control' });
    store.dispatch(asyncAction.start());
    expect(asyncAction.getStateValue(store.getState())).toEqual('START');
    store.dispatch(asyncAction.start({ actionId: 999 }));
    expect(asyncAction.getStateValue(store.getState(), 999)).toEqual('START');
    expect(asyncAction.getResultValue(store.getState())).toBeUndefined();
    store.dispatch(asyncAction.success());
    expect(asyncAction.getStateValue(store.getState())).toEqual('SUCCESS');
    store.dispatch(asyncAction.success({ actionId: 999 }));
    expect(asyncAction.getStateValue(store.getState(), 999)).toEqual('SUCCESS');
    store.dispatch(asyncAction.start());
    store.dispatch(asyncAction.cancel());
    expect(asyncAction.getStateValue(store.getState())).toEqual('CANCEL');
    store.dispatch(asyncAction.start());
    store.dispatch(asyncAction.failure());
    expect(asyncAction.getStateValue(store.getState())).toEqual('FAILURE');
    store.dispatch(asyncAction.start());
    store.dispatch(asyncAction.clear());
    expect(asyncAction.getStateValue(store.getState())).toEqual(undefined);
    store.dispatch(asyncAction.start());
    store.dispatch(asyncAction.success());
    store.dispatch(asyncAction.clear());
    expect(asyncAction.getStateValue(store.getState())).toEqual(undefined);
  });

  it('result keeping', () => {
    const store = createTestStore();
    AwaitControl.init({ keyReducer: 'control' });
    store.dispatch(asyncActionWithInitialValue.start());
    expect(asyncActionWithInitialValue.getResultValue(store.getState())). toEqual([]);
    const resource = [{ id: 1 }, { id: 2 }];
    store.dispatch(asyncActionWithInitialValue.success([...resource]));
    expect(asyncActionWithInitialValue.getResultValue(store.getState())).toEqual(resource);
    store.dispatch(asyncActionWithInitialValue.start());
    expect(asyncActionWithInitialValue.getResultValue(store.getState())).toEqual(resource);
  });

  it('getResultValue validation', () => {
    const store = createTestStore();
    AwaitControl.init({ keyReducer: 'control' });
    store.dispatch(asyncAction.start());
    expect(asyncAction.getStateValue(store.getState())).toEqual('START');
    expect(asyncAction.getResultValue(store.getState())).toBeUndefined();
    store.dispatch(asyncAction.success('OK'));
    expect(asyncAction.getResultValue(store.getState())).toEqual('OK');
    store.dispatch(asyncAction.start({ actionId: 999 }));
    store.dispatch(asyncAction.success('OK', { actionId: 999 }));
    expect(asyncAction.getResultValue(store.getState(), 999)).toEqual('OK');
    store.dispatch(asyncAction.start());
    const error = new Error();
    store.dispatch(asyncAction.failure(error));
    expect(asyncAction.getResultValue(store.getState())).toEqual(error);
  });

  it('initial value', () => {
    const store = createTestStore();
    AwaitControl.init({ keyReducer: 'control' });
    expect(asyncAction.getResultValue(store.getState())).toBeUndefined();
    const isActive = createAsyncAction('IS_ACTIVE', { saveResult: true, initialValue: true });
    expect(isActive.getResultValue(store.getState())).toBeTruthy();
    store.dispatch(isActive.start());
    store.dispatch(isActive.success(false));
    expect(isActive.getResultValue(store.getState())).toBeFalsy();
  });

  it('getResultValue validation', () => {
    const store = createTestStore();
    AwaitControl.init({ extractState: s => ({}), keyReducer: 'control' });
    store.dispatch(asyncAction.start());
    expect(() => asyncAction.getResultValue(store.getState())).toThrowError();
    expect(() => asyncAction.getStateValue(store.getState())).toThrowError();
  });
});
