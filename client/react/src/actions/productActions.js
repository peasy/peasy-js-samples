import constants from '../constants';
import ordersDotCom from '../businessLogic';
import ActionsBase from './ActionsBase';

class ProductActions extends ActionsBase {

  service() {
    return ordersDotCom.services.productService;
  }

  getAllAction(data) {
    return { type: constants.actions.LOAD_PRODUCTS_SUCCESS, products: data };
  }

  insertAction(data) {
    return { type: constants.actions.INSERT_PRODUCT_SUCCESS, product: data };
  }

  updateAction(data) {
    return { type: constants.actions.UPDATE_PRODUCT_SUCCESS, product: data };
  }

  destroyAction(id) {
    return { type: constants.actions.DESTROY_PRODUCT_SUCCESS, id: id };
  }
}

export default ProductActions;