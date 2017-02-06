import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderActions from '../../actions/orderActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import OrderForm from './OrderForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';

let orderActions = new OrderActions();
let inventoryItemActions = new InventoryItemActions();

class ManageOrder extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
  }

  _saveAction(entity) { 
    return orderActions.save(entity);
   }

  _redirectUri() {
    return constants.routes.ORDERS;
  }

  // save(event) {
  //   var self = this;
  //   return super.save(event)
  //     .then((result) => {
  //       if (result && result.success) {
  //         return self.props.dispatch(inventoryItemActions.getById(result.value.id));
  //       }
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Manage Order</h1>
        <OrderForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          order={this.state.entity}
          customers={this.props.customers}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var entity = {};
  var customers = state.customers || [];

  if (ownProps.params.id) {
    var entityId = parseInt(ownProps.params.id, 10);
    if (state.orders.length > 0) {
      entity = state.orders.find(c => c.id === entityId)
    }
  }

  return {
    entity: entity,
    customers: state.customers.map(c => { return { text: c.name, value: c.id }})
  };
}

export default connect(mapStateToProps)(ManageOrder);