import { TypedUseSelectorHook } from 'react-redux';
import {
 Action, ActionFunctionAny, ActionMeta
} from 'redux-actions';

export type AsyncActionState = 'START' | 'SUCCESS' | 'FAILURE' | 'CANCEL';

export type BaseAction = Action<any> | ActionMeta<any, any>;

export type Context = {
  [label: string]: any;
}

export type AsyncActionControlOptions = {
  initialValue: any;
  context: Context;
};
export type AsyncBaseActionControl = {
  start: ActionFunctionAny<BaseAction>;
  success: ActionFunctionAny<BaseAction>;
  failure: ActionFunctionAny<BaseAction>;
  cancel: ActionFunctionAny<BaseAction>;
  clear: ActionFunctionAny<BaseAction>;
};

export type AsyncActionReducerData = [AsyncActionState, any] | [AsyncActionState];
export type AsyncActionReducer = {
  [actionName: string]: AsyncActionReducerData;
};

export type Selector = (state: any) => any;

export type AwaitControlInitializer = {
  keyReducer?: string;
  extractState?: (s: any) => any;
  baseContext?: Context;
};

export type ResultSelector<T = any> = (actionId?: string | number) => T;

export type AwaitControlHook = {
  start: (payload?: any, meta?: any) => BaseAction;
  success: (payload?: any, meta?: any) => BaseAction;
  cancel: (payload?: any, meta?: any) => BaseAction;
  failure: (payload?: any, meta?: any) => BaseAction;
  clear: (payload?: any, meta?: any) => BaseAction;
  isRunning: (actionId?: string | number) => boolean;
  wasCancelled: (actionId?: string | number) => boolean;
  hasFailure: (actionId?: string | number) => boolean;
  isSuccessful: (actionId?: string | number) => boolean;
  result: ResultSelector;
};
