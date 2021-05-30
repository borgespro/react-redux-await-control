import { TypedUseSelectorHook } from 'react-redux';
import { Action, ActionFunctionAny, ActionMeta } from 'redux-actions';

export type AsyncActionState = 'START' | 'SUCCESS' | 'FAILURE' | 'CANCEL';

export type BaseAction = Action<any> | ActionMeta<any, any>;

export type AsyncBaseActionControl = {
  start: ActionFunctionAny<BaseAction>;
  success: ActionFunctionAny<BaseAction>;
  failure: ActionFunctionAny<BaseAction>;
  cancel: ActionFunctionAny<BaseAction>;
  clear: ActionFunctionAny<BaseAction>;
};

export type AsyncActionReducer = {
  [actionName: string]: [AsyncActionState, any];
};

export type Selector = (state: any) => any;

export type AwaitControlInitializer = {
  keyReducer?: string;
};

export type AwaitControlHook = {
  start: (payload?: any, meta?: any) => BaseAction;
  success: (payload?: any, meta?: any) => BaseAction;
  cancel: (payload?: any, meta?: any) => BaseAction;
  failure: (payload?: any, meta?: any) => BaseAction;
  clear: (payload?: any, meta?: any) => BaseAction;
  isRunning: (actionId?: string | number) => TypedUseSelectorHook<any>;
  isCancelled: (actionId?: string | number) => TypedUseSelectorHook<any>;
  hasFailure: (actionId?: string | number) => TypedUseSelectorHook<any>;
  isSuccessful: (actionId?: string | number) => TypedUseSelectorHook<any>;
  result: (actionId?: string | number) => TypedUseSelectorHook<any>;
};
