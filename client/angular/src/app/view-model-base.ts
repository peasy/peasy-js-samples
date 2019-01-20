import { ISubscription } from './contracts';

export abstract class ViewModelBase {

  protected _isDirty: boolean;
  protected _busyCount: number;
  protected _errors: any[] = [];
  protected _subscriptions: ISubscription[] = [];

  constructor() {
    this._busyCount = 0;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  public get isBusy(): boolean {
    return this._busyCount > 0;
  }

  protected loadStarted(): void {
    this._busyCount += 1;
  }

  protected loadCompleted(): void {
    this._busyCount -= 1;
  }

  public get errors(): any[] {
    return this._errors;
  }

  public getErrorMessageFor(field: string): string {
    const error = this._errors.find(e => e.association === field);
    return error ? error.message : null;
  }

  protected addSubscription(subscription: ISubscription): void {
    this._subscriptions.push(subscription);
  }

  public listen(): void {
  }

  public dispose(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }
}
