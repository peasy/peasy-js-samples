import { Rule } from 'peasy-js';
import { ProductService } from '../services/product.service';

export class CanDeleteCategoryRule extends Rule {

  constructor(private categoryId: string, private productService: ProductService) {
    super();
  }

  protected async _onValidate(): Promise<void> {
    const result = await this.productService.getByCategoryCommand(this.categoryId).execute();
    if (result.value && result.value.length > 0) {
      super._invalidate('This category is associated with one or more products and cannot be deleted');
    }
  }
}
