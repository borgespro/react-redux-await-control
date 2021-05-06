import createAsyncAction from '../src/createAsyncAction';
import AwaitControl from '../src';
import createTestStore from './utils/createTestStore';

describe('Testing AsyncActionControl', () => {
  const asyncAction = createAsyncAction('REMOVE_ITEM', 'TEXT_PREFIX');

  it('label validation', () => {
    expect(asyncAction.label).toEqual('TEXT_PREFIX/REMOVE_ITEM');
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
});
