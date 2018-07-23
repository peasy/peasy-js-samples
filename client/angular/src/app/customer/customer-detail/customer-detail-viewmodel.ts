import { CustomerService, ExecutionResult } from '../../services/customer.service';

export interface Entity {
  id: string;
}

export interface Customer extends Entity {
  name: string;
}

class ViewModelBase<T extends Entity> {

  protected _isDirty: boolean;
  protected _isBusy: boolean;
  protected _errors: any[] = [];

  protected CurrentEntity: T;

  constructor(protected service: CustomerService, protected entityId: string = null) {
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

  protected async handle(command): Promise<void> {
    this._isBusy = true;
    try  {
      const result = await command();
      this.CurrentEntity = result.value;
      this._isDirty = false;
    } catch (e) {
      if (Array.isArray(e)) {
        this._errors = e;
      } else {
        this._errors.push(e);
      }
    }
    this._isBusy = false;
  }

  async save(): Promise<void> {
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

export class CustomerDetailViewModel extends ViewModelBase<Customer> {

  constructor(protected service, protected entityId: string = null) {
    super(service, entityId);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}
