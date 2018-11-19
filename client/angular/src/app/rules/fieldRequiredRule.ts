import { Rule } from 'peasy-js';

export class FieldRequiredRule extends Rule {

  constructor(private field: string, private data: object) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (!this.data[this.field]) {
      this.association = this.field;
      this._invalidate(this.field + ' is required');
    }
   return Promise.resolve();
  }
}
