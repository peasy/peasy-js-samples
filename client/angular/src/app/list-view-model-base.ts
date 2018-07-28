import { Entity } from './contracts';
import { ServiceBase } from './services/service-base';
import { ViewModelBase } from './view-model-base';

export class ListViewModelBase<T extends Entity> extends ViewModelBase {

  public data: T[];

  constructor(protected service: ServiceBase<T>) {
    super();
    this.handle(() => service.getAll());
  }

  protected onDataRequest() {

  }

  protected async handle(command): Promise<boolean> {
    let success = true;
    this._isBusy = true;
    try  {
      const result = await command();
      this.data = result.value || this.data;
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

  async destroy(id: string) {
    if (await this.handle(() => this.service.destroy(id))) {
      this.data = this.data.filter(entity => entity.id !== id);
    }
  }

}
