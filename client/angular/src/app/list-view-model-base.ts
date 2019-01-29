import { Entity } from './contracts';
import { BusinessService } from 'peasy-js';
import { ViewModelBase } from './view-model-base';

export class ListViewModelBase<T extends Entity> extends ViewModelBase {

  public data: T[] = [];

  constructor(protected service: BusinessService<T, string>) {
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
      if (result.success) {
        this.data = result.value || this.data;
      } else {
        success = false;
        result.errors.forEach(e => {
          this._errors.push(e.message);
        });
      }
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
