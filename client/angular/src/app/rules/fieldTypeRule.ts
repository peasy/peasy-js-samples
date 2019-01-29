import { Rule } from 'peasy-js';

export class FieldTypeRule extends Rule {

  constructor(private field: string, private value: any, private type, private fieldDisplay?: string) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.value && typeof this.value !== this.type) {
      this.association = this.field;
      this._invalidate(`Invalid type supplied for ${this.fieldDisplay || this.field}, expected ${this.type}`);
    }
    return Promise.resolve();
  }
}
