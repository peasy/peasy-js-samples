import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';

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

      <div className="form-group">
        <label>Total:</label> $100.00
      </div>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary btn-sm"
        onClick={onSave} />

      <input
        type="button"
        value="Cancel"
        className="btn btn-default btn-sm cancelButton"
        onClick={onCancel} />

    </form>
  );
};

export default OrderForm;