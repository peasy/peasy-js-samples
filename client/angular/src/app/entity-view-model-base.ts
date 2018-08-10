import { Entity, ViewModelArgs } from './contracts';
import { ServiceBase } from './services/service-base';
import { ViewModelBase } from './view-model-base';

export class EntityViewModelBase<T extends Entity> extends ViewModelBase {

  protected CurrentEntity: T;

  constructor(protected service: ServiceBase<T>) {
    super();
  }

  loadData(args: ViewModelArgs<T>): Promise<boolean> {
    this._errors = [];
    this.CurrentEntity = args.entity || {} as T;
    if (!this.CurrentEntity.id && args.entityID) {
      return this.handle(() => this.service.getById(args.entityID));
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
      const result = await command();
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
        return await this.handle(() => this.service.insert(this.CurrentEntity));
      } else {
        return await this.handle(() => this.service.update(this.CurrentEntity));
      }
    }
  }
}
