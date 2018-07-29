import { Entity, ViewModelArgs } from './contracts';
import { ServiceBase } from './services/service-base';
import { ViewModelBase } from './view-model-base';

export class EntityViewModelBase<T extends Entity> extends ViewModelBase {

  protected CurrentEntity: T;

  // protected service: ServiceBase<T>;

  constructor(protected service: ServiceBase<T>) {
    super();
  }

  loadData(args: ViewModelArgs<T>): any {
    this.CurrentEntity = args.entity || {} as T;
    if (!this.CurrentEntity.id && args.entityID) {
      this.handle(() => this.service.getById(args.entityID));
    }
  }

  // constructor(args: ViewModelArgs<T>) {
  //   super();
  //   this.service = args.service;
  //   this.CurrentEntity = args.entity || {} as T;
  //   if (!this.CurrentEntity.id && args.entityID) {
  //     this.loadData(args.entityID);
  //   }
  // }

  // loadData(entityId: string): any {
  //   this.handle(() => this.service.getById(entityId));
  // }

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
