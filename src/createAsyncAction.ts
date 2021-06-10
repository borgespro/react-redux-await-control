import { createActions } from 'redux-actions';

import AsyncActionControl from './AsyncActionControl';
import { camelCase } from './utils';
import { PREFIX, CANCEL, FAILURE, START, SUCCESS, STATUS_LIST, CLEAR } from './constants';

type ActionConfig = {
  prefix?: string;
  saveResult?: boolean;
};

export default function createAsyncAction<Payload, Meta = never>(
  actionName: string,
  config?: ActionConfig,
): AsyncActionControl {
  const prefix = config?.prefix?.trim() || PREFIX;
  const asyncActionsMapper = {};
  const asyncLabelsMapper = {};

  STATUS_LIST.forEach((status) => {
    const fetchActionName = `${actionName}_${status}`;
    asyncLabelsMapper[status] = { label: camelCase(fetchActionName) };
    asyncActionsMapper[fetchActionName] = [
      (payload: Payload): Payload => payload,
      (payload: Payload, meta: Meta): Meta => {
        if (meta && typeof meta !== 'object') {
          throw new Error('Meta should be a object');
        }

        return { ...meta, store: !!config?.saveResult };
      },
    ];
  });

  const {
    [asyncLabelsMapper[START].label]: start,
    [asyncLabelsMapper[SUCCESS].label]: success,
    [asyncLabelsMapper[FAILURE].label]: failure,
    [asyncLabelsMapper[CANCEL].label]: cancel,
    [asyncLabelsMapper[CLEAR].label]: clear,
  } = createActions(asyncActionsMapper, { prefix });

  const actionLabel = `${prefix}/${actionName}`;

  return new AsyncActionControl(actionLabel, actionName, {
    start,
    success,
    failure,
    cancel,
    clear,
  });
}
