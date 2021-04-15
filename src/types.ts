import { Action, ActionFunctionAny } from 'redux-actions';

export type AsyncActionState = 'START' | 'SUCCESS' | 'FAILURE' | 'CANCEL';

export type AsyncBaseAction = {
  start: ActionFunctionAny<Action<any>>;
  success: ActionFunctionAny<Action<any>>;
  failure: ActionFunctionAny<Action<any>>;
  cancel: ActionFunctionAny<Action<any>>;
};

export type AsyncActionReducer = {
  [actionName: string]: AsyncActionState;
};
