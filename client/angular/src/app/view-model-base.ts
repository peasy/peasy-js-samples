import { Entity } from './contracts';
import { ServiceBase } from './services/service-base';

export class ViewModelBase<T extends Entity> {

  protected _isDirty: boolean;
  protected _isBusy: boolean;
  protected _errors: any[] = [];

  protected CurrentEntity: T;

  constructor(protected service: ServiceBase<T>, protected entityId: string = null) {
    this.CurrentEntity = { id: null} as T;
    if (this.entityId) {
      this.loadData();
    }
  }

  private loadData() {
    this.handle(() => this.service.getById(this.entityId));
  }

  get id(): string {
    return this.CurrentEntity.id;
  }

  get isDirty(): boolean {
    return this._isDirty;
  }

  get isBusy(): boolean {
    return this._isBusy;
  }

  get isNew(): boolean {
    return !this.CurrentEntity.id;
  }

  get errors(): any[] {
    return this._errors;
  }

  getErrorMessageFor(field: string): string {
    const error = this._errors.find(e => e.association === field);
    return error ? error.message : null;
  }

  protected async handle(command): Promise<boolean> {
    let success = true;
    this._isBusy = true;
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
    this._isBusy = false;
    return success;
  }

  async save(): Promise<boolean> {
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
