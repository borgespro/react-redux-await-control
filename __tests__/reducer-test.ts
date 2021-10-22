import { reducer } from '../src';
import { BaseAction } from '../src/types';

const MOCK_ACTION = 'MOCK_ACTION';

const mockAction = (suffix: string, saveResult?: boolean): BaseAction => ({
  type: `PREFIX_TEST/${MOCK_ACTION}_${suffix}`,
  payload: true,
  meta: { store: !!saveResult },
});

describe('Testing reducer.', () => {
  it('Testing START action', () => {
    const stateAfter = reducer({}, mockAction('START'));
    expect(stateAfter[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter[MOCK_ACTION][0]).toEqual('START');
  });

  it('Testing SUCCESS action', () => {
    const stateAfter1 = reducer({}, mockAction('SUCCESS'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('SUCCESS'));
    expect(stateAfter2[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION][0]).toEqual('SUCCESS');
    expect(stateAfter2[MOCK_ACTION][1]).toEqual(undefined);
    const stateAfter3 = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('SUCCESS', true));
    expect(stateAfter3[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION][0]).toEqual('SUCCESS');
    expect(stateAfter3[MOCK_ACTION][1]).toEqual(true);
    const stateAfter4 = reducer({ [MOCK_ACTION]: ['CANCEL'] }, mockAction('SUCCESS'));
    expect(stateAfter4[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter4[MOCK_ACTION][0]).toEqual('CANCEL');
    expect(stateAfter4[MOCK_ACTION][1]).toBeUndefined();
  });

  it('Testing CANCEL action', () => {
    const stateAfter1 = reducer({}, mockAction('CANCEL'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('CANCEL'));
    expect(stateAfter2[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION][0]).toEqual('CANCEL');
    expect(stateAfter2[MOCK_ACTION][1]).toBeUndefined();
    const stateAfter3 = reducer({ [MOCK_ACTION]: ['SUCCESS'] }, mockAction('CANCEL'));
    expect(stateAfter3[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION][0]).toEqual('CANCEL');
  });

  it('Testing FAILURE action', () => {
    const stateAfter1 = reducer({}, mockAction('FAILURE'));
    expect(stateAfter1[MOCK_ACTION]).toBeUndefined();
    const stateAfter2 = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('FAILURE'));
    expect(stateAfter2[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter2[MOCK_ACTION][0]).toEqual('FAILURE');
    expect(stateAfter2[MOCK_ACTION][1]).toEqual(undefined);
    const stateAfter3 = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('FAILURE', true));
    expect(stateAfter3[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter3[MOCK_ACTION][0]).toEqual('FAILURE');
    expect(stateAfter3[MOCK_ACTION][1]).toEqual(true);
    const stateAfter4 = reducer({ [MOCK_ACTION]: ['SUCCESS'] }, mockAction('FAILURE'));
    expect(stateAfter4[MOCK_ACTION][0]).toBeDefined();
    expect(stateAfter4[MOCK_ACTION][0]).toEqual('FAILURE');
    expect(stateAfter4[MOCK_ACTION][1]).toBeUndefined();
  });

  it('Testing CLEAR action', () => {
    const stateAfter = reducer({ [MOCK_ACTION]: ['START'] }, mockAction('CLEAR'));
    expect(stateAfter[MOCK_ACTION]).toBeUndefined();
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
