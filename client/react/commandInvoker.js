class CommandInvoker {

  constructor(logger = new Logger()) {
    this._logger = logger;
  }

  invokeCommand(command, successAction) {
    dispatch(beginAsyncInvocation());
    return command.executeAsync()
      .then(result => {
        dispatch(endAsyncInvocation());
        if (result.success) {
          dispatch(successAction(result.value));
        }
        return result;
      })
      .catch(e => {
        this._logger.log(e);
        return { success: false, errors: e };
      });
  }
}

class Logger {
  LogError(message) {
    console.log("LOG:ERROR:", message);
  }
}

export default CommandInvoker;