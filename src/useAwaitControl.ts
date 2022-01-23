import { useDispatch, useSelector } from 'react-redux';

import {Dispatch} from "redux";
import AsyncActionControl from './AsyncActionControl';
import { AwaitControlHook } from './types';

type ParamType = AsyncActionControl | AsyncActionControl[];
type ReturnType = AwaitControlHook | AwaitControlHook[];

function createHook<TResult>(dispatch: Dispatch<any>, control: AsyncActionControl): AwaitControlHook {
  const start = (payload?: any, meta?: any) => dispatch(control.start(payload, meta));
  const success = (payload?: any, meta?: any) => dispatch(control.success(payload, meta));
  const cancel = (payload?: any, meta?: any) => dispatch(control.cancel(payload, meta));
  const failure = (payload?: any, meta?: any) => dispatch(control.failure(payload, meta));
  const clear = (meta?: any) => dispatch(control.clear(null, meta));

  const isRunning = (actionId?: string | number) => useSelector<unknown, boolean>(control.isRunning(actionId));
  const wasCancelled = (actionId?: string | number) => useSelector<unknown, boolean>(control.wasCancelled(actionId));
  const hasFailure = (actionId?: string | number) => useSelector<unknown, boolean>(control.hasFailure(actionId));
  const isSuccessful = (actionId?: string | number) => useSelector<unknown, boolean>(control.isSuccessful(actionId));
  const result = (actionId?: string | number) => useSelector<unknown, TResult>(control.getResult(actionId));

  return {
    start,
    success,
    cancel,
    failure,
    clear,
    isRunning,
    wasCancelled,
    hasFailure,
    isSuccessful,
    result,
  };
}

function useAwaitControl<TResult = any>(control: AsyncActionControl): AwaitControlHook;
function useAwaitControl<TResult = any>(control: AsyncActionControl[]): AwaitControlHook[];
function useAwaitControl<TResult = any>(control: ParamType): ReturnType {
  const dispatch = useDispatch();

  if (Array.isArray(control)) {
    return control.map((_control) => createHook<TResult>(dispatch, _control));
  }

  return createHook<TResult>(dispatch, control);
}

export default useAwaitControl;
