import AwaitControl from '../src';
import createAsyncAction from '../src/createAsyncAction';

describe('Testing context implementation', () => {
  AwaitControl.init({ keyReducer: 'control' });
  const withContextTestAction = createAsyncAction('WITH_CONTEXT_TEST', {
    saveResult: true,
    context: {
      make: () => true,
      nested: {a: {b: 'c'}}
    }
  });
  const withoutContextTestAction = createAsyncAction('WITHOUT_CONTEXT_TEST', { saveResult: true });
  const emptyContextTestAction = createAsyncAction('EMPTY_CONTEXT_TEST', { saveResult: true, context: {} });

  it('getContext is defined', () => {
    expect(withContextTestAction.getContext).toBeDefined();
    expect(withoutContextTestAction.getContext).toBeDefined();
    expect(emptyContextTestAction.getContext).toBeDefined();
  });

  it('result of getContext', () => {
    const withContext = withContextTestAction.getContext();
    const withoutContext = withoutContextTestAction.getContext();
    const emptyContext = emptyContextTestAction.getContext();

    expect(withContext).toBeDefined();
    expect(withoutContext).toBeDefined();
    expect(emptyContext).toBeDefined();

    expect(Object.keys(withContext).length).toBeGreaterThan(0);
    expect(Object.keys(withoutContext).length).toEqual(0);
    expect(Object.keys(emptyContext).length).toEqual(0);
  });

  it('queries on getContext', () => {
    const make = withContextTestAction.getContext('make');
    expect(make).toBeDefined();
    expect(make()).toBeTruthy();
    const nested = withContextTestAction.getContext('nested');
    expect(nested).toBeDefined();
    expect(nested.a.b).toEqual('c');
    const innerValue = withContextTestAction.getContext('nested.a.b');
    expect(innerValue).toBeDefined();
    expect(innerValue).toEqual('c');

    let test = withoutContextTestAction.getContext('test');
    expect(test).toBeUndefined();
    let nestedTest = withoutContextTestAction.getContext('nested.test');
    expect(nestedTest).toBeUndefined();

    test = emptyContextTestAction.getContext('test');
    expect(test).toBeUndefined();
    nestedTest = emptyContextTestAction.getContext('nested.test');
    expect(nestedTest).toBeUndefined();
  });
});
