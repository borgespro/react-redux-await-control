import { useDispatch, useSelector } from 'react-redux';

import AsyncActionControl from './AsyncActionControl';
import { AwaitControlHook } from './types';

export default function useAwaitControl(asyncAction: AsyncActionControl): AwaitControlHook {
  const dispatch = useDispatch();

  const start = (payload?: any, meta?: any) => dispatch(asyncAction.start(payload, meta));
  const success = (payload?: any, meta?: any) => dispatch(asyncAction.success(payload, meta));
  const cancel = (payload?: any, meta?: any) => dispatch(asyncAction.cancel(payload, meta));
  const failure = (payload?: any, meta?: any) => dispatch(asyncAction.failure(payload, meta));

  const isRunning = (actionId?: string | number) => useSelector(asyncAction.isRunning(actionId));
  const isCancelled = (actionId?: string | number) => useSelector(asyncAction.isCancelled(actionId));
  const hasFailure = (actionId?: string | number) => useSelector(asyncAction.hasFailure(actionId));
  const isSuccessful = (actionId?: string | number) => useSelector(asyncAction.isSuccessful(actionId));

  return {
    start,
    success,
    cancel,
    failure,
    isRunning,
    isCancelled,
    hasFailure,
    isSuccessful,
  };
}
