import { Command, Rule } from 'peasy-js';
import { ExecutionResult } from '../contracts';

export abstract class CommandBase<T> extends Command {

  public execute(): Promise<ExecutionResult<T>> {
    return super.execute();
  }

  protected _onInitialization(): Promise<void> {
    return Promise.resolve();
  }

  protected _getRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }

  protected _onValidationSuccess(): Promise<void> {
    return Promise.resolve();
  }
}
