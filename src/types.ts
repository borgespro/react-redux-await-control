import { Action, ActionFunctionAny } from 'redux-actions';

export type AsyncBaseAction = {
  [actionName: string]: ActionFunctionAny<Action<any>>;
};
