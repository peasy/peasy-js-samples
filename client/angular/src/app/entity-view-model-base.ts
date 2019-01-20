import { Entity, ViewModelArgs } from './contracts';
import { ViewModelBase } from './view-model-base';
import { BusinessService, ICommand } from 'peasy-js';

export class EntityViewModelBase<T extends Entity> extends ViewModelBase {

  protected CurrentEntity: T;

  constructor(protected service: BusinessService<T, string>) {
    super();
  }

  loadData(args: ViewModelArgs<T>): Promise<boolean> {
    this._errors = [];
    this.CurrentEntity = args.entity || {} as T;
    if (!this.CurrentEntity.id && args.entityID) {
      return this.handle(this.service.getByIdCommand(args.entityID));
    }
  }

  get isNew(): boolean {
    return !this.CurrentEntity.id;
  }

  get id(): string {
    return this.CurrentEntity.id;
  }

  public fieldValid(fieldName: string): boolean {
    return this.getErrorMessageFor(fieldName) === null;
  }

  protected async handle(command: ICommand<T>): Promise<boolean> {
    let success = true;
    this.loadStarted();
    try  {
      const result = await command.execute();
      this.loadCompleted();
      if (!result.success) {
        this._errors = result.errors;
        return;
      }
      this.CurrentEntity = result.value;
      this._isDirty = false;
    } catch (e) {
      success = false;
      if (Array.isArray(e)) {
        this._errors = e;
      } else {
        this._errors.push(e);
      }
    }
    return success;
  }

  protected async validate() {
    this._errors = await this.saveCommand.getErrors();
  }

  protected get saveCommand(): ICommand<T> {
    if (this.isNew) {
      return this.service.insertCommand(this.CurrentEntity);
    }
    return this.service.updateCommand(this.CurrentEntity);
  }

  protected setValue(field: string, value: any): void {
    this.CurrentEntity[field] = value;
    this._isDirty = true;
    this.validate();
  }

  public async save(): Promise<boolean> {
    if (this.isDirty) {
      this._errors = [];
      return await this.handle(this.saveCommand);
    }
  }

}
