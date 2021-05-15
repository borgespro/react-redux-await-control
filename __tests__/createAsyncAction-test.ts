import createAsyncAction from '../src/createAsyncAction';

describe('Testing createAsyncAction.', () => {
  const asyncAction = createAsyncAction('GET_DATA');

  it('Validate label of asyncAction', () => {
    expect(asyncAction.label).toEqual('ASYNC_ACTION/GET_DATA');
  });

  it('Validate start of asyncAction', () => {
    const data = { valid: true };
    const { type, payload } = asyncAction.start(data);
    expect(type).toEqual('ASYNC_ACTION/GET_DATA_START');
    expect(payload.valid).toBeTruthy();
  });

  it('Validate failure of asyncAction', () => {
    const TestError = new Error('Test Example Error');
    const { type, payload, error } = asyncAction.failure(TestError);
    expect(type).toEqual('ASYNC_ACTION/GET_DATA_FAILURE');
    expect(error).toEqual(true);
    expect(payload).toEqual(TestError);
  });

  it('Validate cancel of asyncAction', () => {
    const { type, payload, error } = asyncAction.cancel();
    expect(type).toEqual('ASYNC_ACTION/GET_DATA_CANCEL');
    expect(error).toBeFalsy();
    expect(payload).toBeUndefined();
  });

  it('Validate success of asyncAction', () => {
    const { type, payload, error } = asyncAction.success(true);
    expect(type).toEqual('ASYNC_ACTION/GET_DATA_SUCCESS');
    expect(error).toBeFalsy();
    expect(payload).toEqual(true);
  });

  it('Validate clear of asyncAction', () => {
    const { type, payload, error } = asyncAction.clear();
    expect(type).toEqual('ASYNC_ACTION/GET_DATA_CLEAR');
    expect(error).toBeFalsy();
    expect(payload).toBeUndefined();
  });

  it('Create LOAD_DATA as async action.', () => {
    const actionName = 'LOAD_DATA';
    const actions = createAsyncAction(actionName);
    expect(actions.label).toEqual(`ASYNC_ACTION/${actionName}`);
    expect(actions.start).toBeDefined();
    expect(actions.failure).toBeDefined();
    expect(actions.cancel).toBeDefined();
    expect(actions.success).toBeDefined();
    expect(actions.clear).toBeDefined();
  });

  it('Create LOAD_DATA as async action passing prefix.', () => {
    const actionName = 'LOAD_DATA';
    const actions = createAsyncAction(actionName, 'PREFIX_TEST');
    expect(actions.label).toEqual(`PREFIX_TEST/${actionName}`);
    expect(actions.start).toBeDefined();
    expect(actions.failure).toBeDefined();
    expect(actions.cancel).toBeDefined();
    expect(actions.success).toBeDefined();
  });

  it('Create LOAD_DATA as async action passing empty prefix.', () => {
    const actionName = 'LOAD_DATA';
    const actions = createAsyncAction(actionName, '');
    expect(actions.label).toEqual(`ASYNC_ACTION/${actionName}`);
  });
});
