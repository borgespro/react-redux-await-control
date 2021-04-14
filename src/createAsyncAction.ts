import { createActions } from 'redux-actions';

import AsyncActionControl from './AsyncActionControl';
import { camelCase } from './utils';

const START = 'START';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';

const STATUS_LIST = [START, SUCCESS, FAILURE, CANCEL];

export default function createAsyncAction<Payload, Meta = never>(
  actionName: string,
  prefix?: string,
): AsyncActionControl {
  const asyncActionsMapper = {};
  const asyncLabelsMapper = {};

  STATUS_LIST.forEach((status) => {
    const fetchActionName = `${actionName}_${status}`;
    asyncLabelsMapper[status] = {
      label: camelCase(fetchActionName),
    };
    asyncActionsMapper[fetchActionName] = [
      (payload: Payload): Payload => payload,
      (payload: Payload, meta: Meta): Meta => meta,
    ];
  });

  const {
    [asyncLabelsMapper[START].label]: start,
    [asyncLabelsMapper[SUCCESS].label]: success,
    [asyncLabelsMapper[FAILURE].label]: failure,
    [asyncLabelsMapper[CANCEL].label]: cancel,
  } = createActions(asyncActionsMapper, { prefix });

  return new AsyncActionControl(actionName, {
    start,
    success,
    failure,
    cancel,
  });
}
