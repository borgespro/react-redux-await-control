import { ActionMeta } from 'redux-actions';

import {
  AsyncActionReducer, AsyncActionState, BaseAction,
} from './types';
import {
  CANCEL, CLEAR, FAILURE, START, SUCCESS,
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

export default function reducer(state: AsyncActionReducer = {}, action: BaseAction):
  AsyncActionReducer {
  const { type, payload } = action;
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
    && state[formattedRequestName][0] === START
    && [...resultStatus, CANCEL].includes(requestState)
  ) {
    return {
      ...state,
      [formattedRequestName]: [
        requestState as AsyncActionState,
        resultStatus.includes(requestState) ? payload : undefined,
      ],
    };
  }

  if (requestState === START) {
    return { ...state, [formattedRequestName]: [START, payload] };
  }

  return state;
}
