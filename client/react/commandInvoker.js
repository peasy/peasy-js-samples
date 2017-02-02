import {beginAsyncInvocation, endAsyncInvocation} from '../react/actions/asyncStatusActions';

class CommandInvoker {

  constructor(dispatch, logger = new Logger()) {
    this._dispatch = dispatch;
    this._logger = logger;
  }

  invoke(command, successAction) {
    this._dispatch(beginAsyncInvocation());
    return new Promise((resolve, reject) => {
      command.execute((err, result) => {
        this._dispatch(endAsyncInvocation());
        if (err) return reject(err);
        if (result.success) {
          this._dispatch(successAction(result.value));
        }
        resolve(result);
      });
    });
  }
}

class Logger {
  logError(message) {
    console.log("LOG:ERROR:", message);
  }
}

export default CommandInvoker;