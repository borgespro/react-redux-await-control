import { ActionFunctionAny } from 'redux-actions';

import AwaitControl from './AwaitControl';
import { AsyncBaseActionControl, BaseAction, Selector } from './types';

export default class AsyncActionControl {
  label: string;

  rawKey: string;

  start: ActionFunctionAny<BaseAction>;

  success: ActionFunctionAny<BaseAction>;

  failure: ActionFunctionAny<BaseAction>;

  cancel: ActionFunctionAny<BaseAction>;

  clear: ActionFunctionAny<BaseAction>;

  getKey(actionId?: string | number): string {
    if (actionId) {
      return `${this.rawKey}_${actionId.toString().toUpperCase()}`;
    }

    return this.rawKey;
  }

  private getData(s, actionId?: string | number) {
    const stored = s[AwaitControl.getControl().keyReducer][this.getKey(actionId)];

    if (stored) {
      const [state, resultData] = stored;
      return { state, resultData };
    }

    return {};
  }

  getStateValue(state, actionId?: string | number): string {
    return this.getData(state, actionId).state;
  }

  getResultValue(state, actionId?: string | number): any {
    return this.getData(state, actionId).resultData;
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

  getResult(actionId?: string | number): Selector {
    return (state: any) => this.getResultValue(state, actionId);
  }

  constructor(label: string, rawKey: string, stateActions: AsyncBaseActionControl) {
    this.label = label;
    this.rawKey = rawKey;
    this.start = stateActions.start;
    this.success = stateActions.success;
    this.failure = stateActions.failure;
    this.cancel = stateActions.cancel;
    this.clear = stateActions.clear;
  }
}
