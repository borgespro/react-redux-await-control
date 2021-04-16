import { Action } from 'redux-actions';

import { AsyncActionReducer, AsyncActionState } from './types';
import { CANCEL, FAILURE, START, SUCCESS } from './constants';

export default function reducer(state: AsyncActionReducer = {}, action: Action<any>): AsyncActionReducer {
  const matches = /(.*)\/(.*)_(START|SUCCESS|FAILURE|CANCEL)/.exec(action.type);

  if (!matches) return state;

  const [, , requestName, requestState] = matches;

  if (state[requestName] === START && [SUCCESS, FAILURE, CANCEL].includes(requestState)) {
    return { ...state, [requestName]: requestState as AsyncActionState };
  }

  if (requestState === START) {
    return { ...state, [requestName]: START };
  }

  return state;
}
