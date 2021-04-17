import AwaitControl from '../src';

describe('Testing AwaitControl', () => {
  it('basic validations', () => {
    expect(AwaitControl.getControl).toThrowError('AwaitControl was not initialized.');
    AwaitControl.init();
    expect(AwaitControl.getControl()).toBeDefined();
    expect(AwaitControl.getControl().keyReducer).toEqual('rrAwaitControl');
    AwaitControl.init({ keyReducer: 'testKeyReducer' });
    expect(AwaitControl.getControl().keyReducer).toEqual('testKeyReducer');
  });
});
