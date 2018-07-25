export class ViewModelBase {

  protected _isDirty: boolean;
  protected _isBusy: boolean;
  protected _errors: any[] = [];

  get isDirty(): boolean {
    return this._isDirty;
  }

  get isBusy(): boolean {
    return this._isBusy;
  }

  get errors(): any[] {
    return this._errors;
  }

  getErrorMessageFor(field: string): string {
    const error = this._errors.find(e => e.association === field);
    return error ? error.message : null;
  }
}
