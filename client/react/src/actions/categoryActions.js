import constants from '../constants';
import ordersDotCom from '../businessLogic';
import ActionsBase from './ActionsBase';

class CategoryActions extends ActionsBase {

  service() {
    return ordersDotCom.services.categoryService;
  }

	getAllAction(data) {
		return { type: constants.actions.LOAD_CATEGORIES_SUCCESS, categories: data };
	}

	insertAction(data) {
		return { type: constants.actions.INSERT_CATEGORY_SUCCESS, category: data };
	}

	updateAction(data) {
		return { type: constants.actions.UPDATE_CATEGORY_SUCCESS, category: data };
	}

	destroyAction(id) {
		return { type: constants.actions.DESTROY_CATEGORY_SUCCESS, id: id };
	}
}

export default CategoryActions;