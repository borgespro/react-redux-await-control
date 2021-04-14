import { Action, ActionFunctionAny } from 'redux-actions';

import { AsyncBaseAction } from './types';

export default class AsyncActionControl {
  label: string;

  start: ActionFunctionAny<Action<any>>;

  success: ActionFunctionAny<Action<any>>;

  failure: ActionFunctionAny<Action<any>>;

  cancel: ActionFunctionAny<Action<any>>;

  constructor(label: string, stateActions: AsyncBaseAction) {
    this.label = label;
    this.start = stateActions.start;
    this.success = stateActions.success;
    this.failure = stateActions.failure;
    this.cancel = stateActions.cancel;
  }
}
