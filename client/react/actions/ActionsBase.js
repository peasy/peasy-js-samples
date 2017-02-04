import CommandInvoker from '../commandInvoker';

class ActionsBase {

  service() { }

  getAllAction(data) { }

  getByIdAction(id) { }

  insertAction(data) { }

  updateAction(data) { }

  destroyAction(id) { }

  loadData() {
    var self = this;
    return function(dispatch, getState) {
      var command = self.service().getAllCommand();
      return new CommandInvoker(dispatch).invoke(command, self.getAllAction);
    }
  }

  getById(id) {
    var self = this;
    return function(dispatch, getState) {
      var command = self.service().getByIdCommand(id);
      return new CommandInvoker(dispatch).invoke(command, self.getByIdAction);
    }
  }

  save(data) {
    var self = this;
    return function(dispatch, getState) {
      var { command, actionFunc } = getFunctionsFor(data);
      return new CommandInvoker(dispatch).invoke(command, actionFunc);

      function getFunctionsFor(data) {
        if (data.id) {
          return {
            command: self.service().updateCommand(data),
            actionFunc: self.updateAction
          };
        }
        return {
          command: self.service().insertCommand(data),
          actionFunc: self.insertAction
        };
      }
    }
  }

  destroy(id) {
    var self = this;
    return function(dispatch, getState) {
      var command = self.service().destroyCommand(id);
      return new CommandInvoker(dispatch).invoke(command, destroyCustomerSuccess(id));
    }

    function destroyCustomerSuccess(id) {
      return () => {
        return self.destroyAction(id);
      }
    }
  }
}

export default ActionsBase;