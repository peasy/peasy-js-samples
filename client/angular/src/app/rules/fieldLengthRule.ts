import { Rule } from 'peasy-js';

export class FieldLengthRule extends Rule {

  constructor(private field: string, private value: string, private length) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.value && this.value.length > this.length) {
      this.association = this.field;
      this._invalidate(this.field + ' accepts a max length of ' + this.length);
    }
    return Promise.resolve();
  }
}
