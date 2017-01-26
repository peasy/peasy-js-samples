import constants from '../constants';

export function beginAsyncInvocation() {
  return { type: constants.actions.BEGIN_ASYNC_INVOCATION };
}