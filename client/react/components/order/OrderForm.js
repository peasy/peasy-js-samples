import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';
import OrderItemsView from '../orderItem/orderItemsView';

const OrderForm = ({viewModel, onSave, onChange, onSubmitOrder, saving, errors, onCancel, dispatch}) => {
  return (
    <form>

      <div className="form-group">
        <label>Id:</label> {viewModel.entity.id}
      </div>

      <SelectInput
        name="customerId"
        label="Customer"
        value={viewModel.entity.customerId}
        defaultOption="Select Customer..."
        options={viewModel.customerSelectValues}
        onChange={onChange}
        errors={errors} />

      <OrderItemsView 
        viewModel={viewModel} 
        dispatch={dispatch} />

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
        className="btn btn-info btn-sm"
        onClick={onSubmitOrder} />

    </form>
  );

  function getStyle() {
    return viewModel.hasPendingItems ? {} : { visibility: 'hidden' };
  }
};


export default OrderForm;