import React from 'react';
import SelectInput from '../common/SelectInput';
import OrderItemsView from '../orderItem/orderItemsView';

const OrderForm = ({viewModel, onSave, onChange, onSubmitOrder, saving, errors, onCancel, dispatch}) => {
  return (
    <form>

      <div className="form-group">
        <label className="form-label">Id:</label> {viewModel.entity.id}
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

			<div className="button-grouping">
				<button
					disabled={saving}
					className="btn btn-primary btn-sm"
					onClick={onSave}>{saving ? 'Saving...' : 'Save'}</button>

				<button
					className="btn btn-secondary btn-sm"
					onClick={onCancel}>Done</button>

				<input
					type="button"
					disabled={saving}
					style={getStyle()}
					value={saving ? 'Submitting...' : 'Submit Order'}
					className="btn btn-info btn-sm"
					onClick={onSubmitOrder} />

			</div>

    </form>
  );

  function getStyle() {
    return viewModel.hasPendingItems ? {} : { visibility: 'hidden' };
  }
};


export default OrderForm;