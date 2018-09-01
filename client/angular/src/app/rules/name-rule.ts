import { Rule } from 'peasy-js';

export class NameRule extends Rule {

  constructor(private name: string) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.name === 'aaron han') {
      super._invalidate('Name cannot be aaron han');
    }
    return Promise.resolve();
  }
}
