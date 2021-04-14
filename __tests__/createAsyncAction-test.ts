import createAsyncAction from '../src/createAsyncAction';

describe('Testing createAsyncAction.', () => {
  const asyncAction = createAsyncAction('ASYNC_ACTION');

  it('Validate label of asyncAction', () => {
    expect(asyncAction.label).toEqual('ASYNC_ACTION');
  });

  it('Validate start of asyncAction', () => {
    const data = { valid: true };
    const { type, payload } = asyncAction.start(data);
    expect(type).toEqual('ASYNC_ACTION_START');
    expect(payload.valid).toBeTruthy();
  });

  it('Validate failure of asyncAction', () => {
    const testError = new Error('Test Example Error');
    const { type, payload, error } = asyncAction.failure(testError);
    expect(type).toEqual('ASYNC_ACTION_FAILURE');
    expect(error).toEqual(true);
    expect(payload).toEqual(testError);
  });

  it('Validate cancel of asyncAction', () => {
    const { type, payload, error } = asyncAction.cancel();
    expect(type).toEqual('ASYNC_ACTION_CANCEL');
    expect(error).toBeFalsy();
    expect(payload).toBeUndefined();
  });

  it('Validate cancel of asyncAction', () => {
    const { type, payload, error } = asyncAction.success(true);
    expect(type).toEqual('ASYNC_ACTION_SUCCESS');
    expect(error).toBeFalsy();
    expect(payload).toEqual(true);
  });

  it('Create LOAD_DATA as async action.', () => {
    const actionName = 'LOAD_DATA';
    const actions = createAsyncAction(actionName);
    expect(actions.label).toEqual(actionName);
    expect(actions.start).toBeDefined();
    expect(actions.failure).toBeDefined();
    expect(actions.cancel).toBeDefined();
    expect(actions.success).toBeDefined();
  });
});
