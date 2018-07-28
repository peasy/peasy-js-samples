export class ViewModelBase {

  protected _isDirty: boolean;
  protected _isBusy: boolean;
  protected _errors: any[] = [];

  public get isDirty(): boolean {
    return this._isDirty;
  }

  public get isBusy(): boolean {
    return this._isBusy;
  }

  public get errors(): any[] {
    return this._errors;
  }

  protected getErrorMessageFor(field: string): string {
    const error = this._errors.find(e => e.association === field);
    return error ? error.message : null;
  }
}
