import { ActionFunctionAny } from 'redux-actions';

import AwaitControl from './AwaitControl';
import {
  AsyncActionControlOptions,
  AsyncBaseActionControl,
  BaseAction,
  Selector,
} from './types';
import { NEVER } from './constants';
import get from './get';

export default class AsyncActionControl<Context = never> {
  label: string;

  rawKey: string;

  options: AsyncActionControlOptions;

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
    const control = AwaitControl.getControl();
    const extracted = control.extractState(s);
    const statedAction = extracted(control.keyReducer);

    if (!statedAction) {
      throw new Error(`Reducer ${control.keyReducer} not started.`);
    }
    const stored = statedAction[this.getKey(actionId)];

    if (this.options?.initialValue !== undefined && (!stored || stored[1] === NEVER)) {
      return { resultData: this.options.initialValue };
    }

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
    const value = this.getData(state, actionId).resultData;

    if (value !== NEVER) {
      return value;
    }

    return undefined;
  }

  isRunning(actionId?: string | number): Selector {
    return (state: any) => this.getStateValue(state, actionId) === 'START';
  }

  wasCancelled(actionId?: string | number): Selector {
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

  getContext(path?: string) {
    return get(this.options.context, path);
  }

  constructor(label: string, rawKey: string, stateActions: AsyncBaseActionControl, options: AsyncActionControlOptions) {
    this.label = label;
    this.rawKey = rawKey;
    this.options = options;
    this.start = stateActions.start;
    this.success = stateActions.success;
    this.failure = stateActions.failure;
    this.cancel = stateActions.cancel;
    this.clear = stateActions.clear;
  }
}
