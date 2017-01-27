import constants from '../constants';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function asyncStatusReducer(state = 0, action) {
  if (action.type === constants.actions.BEGIN_ASYNC_INVOCATION) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type) ||
             action.type === constants.actions.END_ASYNC_INVOCATION) {
    return state - 1;
  }
  return state;
};