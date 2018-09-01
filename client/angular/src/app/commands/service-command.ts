import { Command } from 'peasy-js';
import { ExecutionResult } from '../contracts';

export class CommandArgs {
  _onInitialization?: any;
  _getRules?: any;
  _onValidationSuccess?: any;
}

export class ServiceCommand<T> extends Command {

  constructor(functions: CommandArgs) {
    super(functions);
  }

  public execute(): Promise<ExecutionResult<T>> {
    return super.execute();
  }
}
