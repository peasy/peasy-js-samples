import constants from '../constants';

export function beginAsyncInvocation() {
  return { type: constants.actions.BEGIN_ASYNC_INVOCATION };
}

export function endAsyncInvocation() {
  return { type: constants.actions.END_ASYNC_INVOCATION };
}