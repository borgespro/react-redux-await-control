import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import AsyncActionControl from './AsyncActionControl';
import { AwaitControlHook } from './types';

export default function useAwaitControl<TResult = any>(asyncAction: AsyncActionControl): AwaitControlHook {
  const dispatch = useDispatch();

  const start = (payload?: any, meta?: any) => dispatch(asyncAction.start(payload, meta));
  const success = (payload?: any, meta?: any) => dispatch(asyncAction.success(payload, meta));
  const cancel = (payload?: any, meta?: any) => dispatch(asyncAction.cancel(payload, meta));
  const failure = (payload?: any, meta?: any) => dispatch(asyncAction.failure(payload, meta));
  const clear = (meta?: any) => dispatch(asyncAction.clear(null, meta));

  const isRunning = (actionId?: string | number) =>
    useSelector<boolean>(asyncAction.isRunning(actionId)) as TypedUseSelectorHook<boolean>;
  const isCancelled = (actionId?: string | number) =>
    useSelector<boolean>(asyncAction.isCancelled(actionId)) as TypedUseSelectorHook<boolean>;
  const hasFailure = (actionId?: string | number) =>
    useSelector<boolean>(asyncAction.hasFailure(actionId)) as TypedUseSelectorHook<boolean>;
  const isSuccessful = (actionId?: string | number) =>
    useSelector<boolean>(asyncAction.isSuccessful(actionId)) as TypedUseSelectorHook<boolean>;

  const result = (actionId?: string | number) =>
    useSelector<TResult>(asyncAction.getResult(actionId)) as TypedUseSelectorHook<TResult>;

  return {
    start,
    success,
    cancel,
    failure,
    clear,
    isRunning,
    isCancelled,
    hasFailure,
    isSuccessful,
    result,
  };
}
