import { reducer } from '../src';
import { BaseAction } from '../src/types';

const MOCK_ACTION = 'MOCK_ACTION';

const mockAction = (suffix: string): BaseAction => ({
  type: `PREFIX_TEST/${MOCK_ACTION}_${suffix}`,
  payload: true,
});

describe('Testing reducer.', () => {
  it('Testing START action', () => {
    const stateAfter = reducer({}, mockAction('START'));
    expect(stateAfter[MOCK_ACTION]).toBeDefined();
    expect(stateAfter[MOCK_ACTION]).toEqual('START');
  });

  it('Testing SUCCESS action', () => {
    const stateAfter1 = reducer({}, mockAction('SUCCESS'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: 'START' }, mockAction('SUCCESS'));
    expect(stateAfter2[MOCK_ACTION]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION]).toEqual('SUCCESS');
    const stateAfter3 = reducer({ [MOCK_ACTION]: 'CANCEL' }, mockAction('SUCCESS'));
    expect(stateAfter3[MOCK_ACTION]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION]).toEqual('CANCEL');
  });

  it('Testing CANCEL action', () => {
    const stateAfter1 = reducer({}, mockAction('CANCEL'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: 'START' }, mockAction('CANCEL'));
    expect(stateAfter2[MOCK_ACTION]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION]).toEqual('CANCEL');
    const stateAfter3 = reducer({ [MOCK_ACTION]: 'SUCCESS' }, mockAction('CANCEL'));
    expect(stateAfter3[MOCK_ACTION]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION]).toEqual('SUCCESS');
  });

  it('Testing FAILURE action', () => {
    const stateAfter1 = reducer({}, mockAction('FAILURE'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: 'START' }, mockAction('FAILURE'));
    expect(stateAfter2[MOCK_ACTION]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION]).toEqual('FAILURE');
    const stateAfter3 = reducer({ [MOCK_ACTION]: 'SUCCESS' }, mockAction('FAILURE'));
    expect(stateAfter3[MOCK_ACTION]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION]).toEqual('SUCCESS');
  });

  it('Testing INVALID action with', () => {
    const stateAfter = reducer({}, mockAction('INVALID'));
    expect(stateAfter[MOCK_ACTION]).toBeUndefined();
  });

  it('Testing with empty state action with', () => {
    const stateAfter = reducer({}, { type: 'PREFIX_TEST/MOCK_ACTION', payload: true });
    expect(stateAfter[MOCK_ACTION]).toBeUndefined();
  });

  it('Testing without prefix in state action with', () => {
    const stateAfter = reducer({}, { type: 'MOCK_ACTION_START', payload: true });
    expect(stateAfter[MOCK_ACTION]).toBeUndefined();
  });
});
