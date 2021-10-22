import createAsyncAction from '../src/createAsyncAction';
import AwaitControl from '../src';
import createTestStore from './utils/createTestStore';

describe('Testing AsyncActionControl', () => {
  const asyncAction = createAsyncAction('REMOVE_ITEM', { prefix: 'TEXT_PREFIX', saveResult: true });

  it('label validation', () => {
    expect(asyncAction.label).toEqual('TEXT_PREFIX/REMOVE_ITEM');
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

  it('getResultValue validation', () => {
    const store = createTestStore();
    AwaitControl.init({ keyReducer: 'control' });
    store.dispatch(asyncAction.start());
    expect(asyncAction.getStateValue(store.getState())).toEqual('START');
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

  it('getResultValue validation', () => {
    const store = createTestStore();
    AwaitControl.init({ extractState: s => ({}), keyReducer: 'control' });
    store.dispatch(asyncAction.start());
    expect(() => asyncAction.getStateValue(store.getState())).toThrowError();
  });
});
