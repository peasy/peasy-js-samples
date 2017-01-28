import {beginAsyncInvocation, endAsyncInvocation} from '../react/actions/asyncStatusActions';

class CommandInvoker {

  constructor(dispatch, logger = new Logger()) {
    this._dispatch = dispatch;
    this._logger = logger;
  }

  invoke(command, successAction) {
    this._dispatch(beginAsyncInvocation());
    return command.executeAsync()
      .then(result => {
        this._dispatch(endAsyncInvocation());
        if (result.success) {
          this._dispatch(successAction(result.value));
        }
        return result;
      })
      .catch(e => {
        this._logger.logError(e);
        return { success: false, errors: e };
      });
  }
}

class Logger {
  logError(message) {
    console.log("LOG:ERROR:", message);
  }
}

export default CommandInvoker;