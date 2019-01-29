import { Rule } from 'peasy-js';

export class FieldRequiredRule extends Rule {

  constructor(private field: string, private data: object, private fieldDisplay?: string) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (!this.data[this.field]) {
      this.association = this.field;
      this._invalidate((this.fieldDisplay || this.field) + ' is required');
    }
   return Promise.resolve();
  }
}
