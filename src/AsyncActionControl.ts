import { ActionFunctionAny, ActionMeta } from 'redux-actions';

import AwaitControl from './AwaitControl';
import { AsyncBaseActionControl, BaseAction, Selector } from './types';

export default class AsyncActionControl {
  label: string;

  rawKey: string;

  start: ActionFunctionAny<BaseAction>;

  success: ActionFunctionAny<BaseAction>;

  failure: ActionFunctionAny<BaseAction>;

  cancel: ActionFunctionAny<BaseAction>;

  getKey(actionId?: string | number): string {
    if (actionId) {
      return `${this.rawKey}_${actionId.toString().toUpperCase()}`;
    }

    return this.rawKey;
  }

  getStateValue(state, actionId?: string | number): string {
    return state[AwaitControl.getControl().keyReducer][this.getKey(actionId)];
  }

  isRunning(actionId?: string | number): Selector {
    return (state: any) => this.getStateValue(state, actionId) === 'START';
  }

  isCancelled(actionId?: string | number): Selector {
    return (state: any) => this.getStateValue(state, actionId) === 'CANCEL';
  }

  hasFailure(actionId?: string | number): Selector {
    return (state: any) => this.getStateValue(state, actionId) === 'FAILURE';
  }

  isSuccessful(actionId?: string | number): Selector {
    return (state: any) => this.getStateValue(state, actionId) === 'SUCCESS';
  }

  constructor(label: string, rawKey: string, stateActions: AsyncBaseActionControl) {
    this.label = label;
    this.rawKey = rawKey;
    this.start = stateActions.start;
    this.success = stateActions.success;
    this.failure = stateActions.failure;
    this.cancel = stateActions.cancel;
  }
}
