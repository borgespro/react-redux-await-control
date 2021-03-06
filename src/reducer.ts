import { ActionMeta } from 'redux-actions';

import {
 AsyncActionReducer, AsyncActionReducerData, AsyncActionState, BaseAction,
} from './types';
import {
 CANCEL, CLEAR, FAILURE, NEVER, START, SUCCESS,
} from './constants';

const formatRequestName = (requestName: string, { payload, meta }: ActionMeta<any, any>) => {
  const actionPayloadMeta: any = {};

  if (typeof payload === 'object') {
    Object.assign(actionPayloadMeta, payload);
  }

  if (typeof meta === 'object') {
    Object.assign(actionPayloadMeta, meta);
  }

  if (actionPayloadMeta.actionId) {
    return `${requestName}_${actionPayloadMeta.actionId.toString().toUpperCase()}`;
  }

  return requestName;
};

export default function reducer(state: AsyncActionReducer = {}, action: BaseAction): AsyncActionReducer {
  const { type, payload, meta } = action as any;
  const matches = /(.*)\/(.*)_(START|SUCCESS|FAILURE|CANCEL|CLEAR)/.exec(type);

  if (!matches) return state;

  const [, , requestName, requestState] = matches;

  const formattedRequestName = formatRequestName(requestName, action as ActionMeta<any, any>);

  if (requestState === CLEAR) {
    const { [formattedRequestName]: _, ...rest } = state;
    return rest;
  }

  const resultStatus = [SUCCESS, FAILURE];

  if (
    state[formattedRequestName]
    && [CANCEL, FAILURE].includes(state[formattedRequestName][0])
    && requestState !== START
  ) {
    return state;
  }

  if (requestState === START) {
    if (meta?.store) {
      const current = state[formattedRequestName];
      return { ...state, [formattedRequestName]: current ? [START, current[1]] : [START, NEVER] }
    }

    return { ...state, [formattedRequestName]: [START] };
  }

  if (state[formattedRequestName] && [...resultStatus, CANCEL].includes(requestState)) {
    const storingData: AsyncActionReducerData = [requestState as AsyncActionState];

    if (meta?.store) {
      storingData.push(resultStatus.includes(requestState) ? payload : undefined);
    }

    return { ...state, [formattedRequestName]: storingData };
  }

  return state;
}
