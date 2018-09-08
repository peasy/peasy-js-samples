import { Entity } from './contracts';
import { ServiceBase } from './services/service-base';
import { ViewModelBase } from './view-model-base';

export class ListViewModelBase<T extends Entity> extends ViewModelBase {

  public data: T[] = [];

  constructor(protected service: ServiceBase<T>) {
    super();
  }

  public loadData(): Promise<boolean> {
    return this.handle(() => this.service.getAllCommand());
  }

  protected async handle(command: any): Promise<boolean> {
    let success = true;
    this.loadStarted();
    try  {
      const result = await command().execute();
      this.data = result.value || this.data;
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

  async destroy(id: string): Promise<boolean> {
    const result = await this.handle(() => this.service.destroyCommand(id));
    if (result) {
      this.data = this.data.filter(entity => entity.id !== id);
    }
    return result;
  }

}
