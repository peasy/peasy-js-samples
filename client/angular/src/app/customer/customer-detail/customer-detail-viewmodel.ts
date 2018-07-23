// import { Customer } from '../../customer';

interface Entity {
  id: string;
}

interface Customer extends Entity {
  name: string;
}

class ViewModelBase<T extends Entity> {

  protected _isDirty: boolean;
  protected _isBusy: boolean;
  protected _errors: any[] = [];

  protected CurrentEntity: T;

  constructor(protected service, protected entityId: string = null) {
    this.CurrentEntity = { id: null} as T;
    if (this.entityId) {
      this.loadData();
    }
  }

  private loadData() {
    const command = this.service.getByIdCommand(this.entityId);
    this.handleCommand(command);
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

  private handleCommand(command): void {
    this._isBusy = true;
    command.execute((err, result) => {
      this._isBusy = false;
      this._isDirty = false;
      if (err) { return this._errors.push(err); }
      if (!result.success) {
        this._errors = result.errors;
        return;
      }
      this.CurrentEntity = result.value;
    });
  }

  save(): void {
    if (this.isDirty) {
      this._errors = [];
      let command = this.service.updateCommand(this.CurrentEntity);
      if (this.isNew) {
        command = this.service.insertCommand(this.CurrentEntity);
      }
      this.handleCommand(command);
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
