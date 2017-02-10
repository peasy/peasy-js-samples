import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';
import OrderItemsView from '../orderItem/orderItemsView';

const OrderForm = ({order, orderItems, onSave, onChange, onSubmitOrder, saving, errors, onCancel}) => {

  return (
    <form>

      <div className="form-group">
        <label>Id:</label> {order.id}
      </div>

      <SelectInput
        name="customerId"
        label="Customer"
        value={order.customer.id}
        defaultOption="Select Customer..."
        options={order.customers.map(c => { return { text: c.name, value: c.id } })}
        onChange={onChange}
        errors={errors} />

      <OrderItemsView orderId={order.id}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary btn-sm"
        onClick={onSave} />

      <input
        type="button"
        value="Done"
        className="btn btn-default btn-sm cancelButton"
        onClick={onCancel} />

      <input
        type="button"
        disabled={saving}
        style={getStyle()}
        value={saving ? 'Submitting...' : 'Submit Order'}
        className="btn btn-success btn-sm"
        onClick={onSubmitOrder} />

    </form>
  );

  function getStyle() {
    if (!order.hasPendingItems) {
      return {
        visibility: 'hidden'
      }
    }
    return { };
  };
};


export default OrderForm;