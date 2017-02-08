import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';
import OrderItemsView from '../orderItem/orderItemsView';

const OrderForm = ({order, onSave, onChange, saving, errors, onCancel, customers}) => {
  return (
    <form>

      <div className="form-group">
        <label>Id:</label> {order.id}
      </div>

      <SelectInput
        name="customerId"
        label="Customer"
        value={order.customerId}
        defaultOption="Select Customer..."
        options={customers}
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

    </form>
  );
};

export default OrderForm;