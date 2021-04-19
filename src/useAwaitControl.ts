import { useDispatch, useSelector } from 'react-redux';

import AsyncActionControl from './AsyncActionControl';
import { AwaitControlHook } from './types';

export default function useAwaitControl(asyncAction: AsyncActionControl): AwaitControlHook {
  const dispatch = useDispatch();

  const start = () => dispatch(asyncAction.start());
  const success = () => dispatch(asyncAction.success());
  const cancel = () => dispatch(asyncAction.cancel());
  const failure = () => dispatch(asyncAction.failure());

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
