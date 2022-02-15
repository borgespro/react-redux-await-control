import { createActions } from 'redux-actions';

import AsyncActionControl from './AsyncActionControl';
import { camelCase } from './utils';
import {
 PREFIX, CANCEL, FAILURE, START, SUCCESS, STATUS_LIST, CLEAR,
} from './constants';

type ActionConfig = {
  prefix?: string;
  saveResult?: boolean;
  initialValue?: any;
};

export default function createAsyncAction<Payload, Meta = never, Context = never>(
  actionName: string,
  config?: ActionConfig,
  context?: Context,
): AsyncActionControl {
  const { saveResult, initialValue } = config || {};
  const prefix = config?.prefix?.trim() || PREFIX;
  const asyncActionsMapper = {};
  const asyncLabelsMapper = {};

  const actionLabel = `${prefix}/${actionName}`;

  STATUS_LIST.forEach((status) => {
    const fetchActionName = `${actionName}_${status}`;
    asyncLabelsMapper[status] = { label: camelCase(fetchActionName) };
    const actionPayload = (payload: Payload): Payload => payload;
    const actionPayloadAndMeta = (payload: Payload, meta: Meta): Meta => {
      if (meta && typeof meta !== 'object') {
        throw new Error('Meta should be a object');
      }

      return { ...meta, store: !!saveResult };
    };
    actionPayload.toString = () => `${actionLabel}_${status}`
    actionPayloadAndMeta.toString = () => `${actionLabel}_${status}`
    asyncActionsMapper[fetchActionName] = [actionPayload, actionPayloadAndMeta];
  });

  const {
    [asyncLabelsMapper[START].label]: start,
    [asyncLabelsMapper[SUCCESS].label]: success,
    [asyncLabelsMapper[FAILURE].label]: failure,
    [asyncLabelsMapper[CANCEL].label]: cancel,
    [asyncLabelsMapper[CLEAR].label]: clear,
  } = createActions(asyncActionsMapper, { prefix });

  const actions = {
   start, success, failure, cancel, clear
  };

  return new AsyncActionControl(actionLabel, actionName, actions, { initialValue }, context);
}
