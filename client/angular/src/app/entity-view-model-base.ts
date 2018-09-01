import { Entity, ViewModelArgs } from './contracts';
import { ServiceBase } from './services/service-base';
import { ViewModelBase } from './view-model-base';
import { ServiceBaseII } from './services/customer.service-II';

export class EntityViewModelBase<T extends Entity> extends ViewModelBase {

  protected CurrentEntity: T;

  constructor(protected service: ServiceBaseII<T>) {
    super();
  }

  loadData(args: ViewModelArgs<T>): Promise<boolean> {
    this._errors = [];
    this.CurrentEntity = args.entity || {} as T;
    if (!this.CurrentEntity.id && args.entityID) {
      return this.handle(() => this.service.getByIdCommand(args.entityID));
    }
  }

  get isNew(): boolean {
    return !this.CurrentEntity.id;
  }

  get id(): string {
    return this.CurrentEntity.id;
  }

  protected async handle(command): Promise<boolean> {
    let success = true;
    this.loadStarted();
    try  {
      const result = await command().execute();
      if (!result) {
        console.warn('the result in handle() was null.  are you sure you have a return statement in your command function?');
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
    this.loadCompleted();
    return success;
  }

  public async save(): Promise<boolean> {
    if (this.isDirty) {
      this._errors = [];
      if (this.isNew) {
        return await this.handle(() => this.service.insertCommand(this.CurrentEntity));
      } else {
        return await this.handle(() => this.service.updateCommand(this.CurrentEntity));
      }
    }
  }
}
