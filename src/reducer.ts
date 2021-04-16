import { ActionMeta } from 'redux-actions';

import { AsyncActionReducer, AsyncActionState } from './types';
import { CANCEL, FAILURE, START, SUCCESS } from './constants';

const formatRequestName = (requestName: string, { payload, meta }: ActionMeta<any, any>) => {
  const actionPayloadMeta: any = {};

  if (typeof payload === 'object') {
    Object.assign(actionPayloadMeta, payload);
  }

  if (typeof meta === 'object') {
    Object.assign(actionPayloadMeta, meta);
  }

  if (actionPayloadMeta.awaitId) {
    return `${requestName}_${actionPayloadMeta.awaitId.toString().toUpperCase()}`;
  }

  return requestName;
};

export default function reducer(state: AsyncActionReducer = {}, action: ActionMeta<any, any>): AsyncActionReducer {
  const matches = /(.*)\/(.*)_(START|SUCCESS|FAILURE|CANCEL)/.exec(action.type);

  if (!matches) return state;

  const [, , requestName, requestState] = matches;

  const formattedRequestName = formatRequestName(requestName, action);

  if (state[formattedRequestName] === START && [SUCCESS, FAILURE, CANCEL].includes(requestState)) {
    return { ...state, [formattedRequestName]: requestState as AsyncActionState };
  }

  if (requestState === START) {
    return { ...state, [formattedRequestName]: START };
  }

  return state;
}
