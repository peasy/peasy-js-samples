import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const OrderItemForm = ({viewModel, onSave, onChange, saving, errors, onCancel }) => {
  return (
    <form>

      <SelectInput
        name="categoryId"
        label="Category"
        value={viewModel.categoryId}
        defaultOption="Select Category..."
        options={viewModel.categorySelectValues}
        onChange={onChange}
        errors={errors} />

      <SelectInput
        name="productId"
        label="Product"
        value={viewModel.productId}
        defaultOption="Select Product..."
        options={viewModel.productSelectValues}
        onChange={onChange}
        errors={errors} />

      <div className="form-group">
        <label className="form-label">In Stock:</label> {viewModel.inventoryCount}
      </div>

      <div className="form-group">
        <label className="form-label">Price:</label> {viewModel.priceFormatted}
      </div>

      <TextInput
        name="quantity"
        label="Quantity"
        value={viewModel.entity.quantity}
        onChange={onChange}
        errors={errors} />

      <div className="form-group">
        <label className="form-label">Amount:</label> {viewModel.amountFormatted}
      </div>

			<div className="button-grouping">
				<button
					disabled={saving}
					className="btn btn-primary btn-sm"
					onClick={onSave}>{saving ? 'Saving...' : 'Save'}</button>

				<button
					value="Cancel"
					className="btn btn-secondary btn-sm"
					onClick={onCancel}>Cancel</button>
			</div>

    </form>
  );
};

export default OrderItemForm;