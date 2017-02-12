import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';

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
        <label>In Stock:</label> {viewModel.inventoryCount}
      </div>

      <div className="form-group">
        <label>Price:</label> {viewModel.priceFormatted}
      </div>

      <TextInput
        name="quantity"
        label="Quantity"
        value={viewModel.entity.quantity}
        onChange={onChange}
        errors={errors} />

      <div className="form-group">
        <label>Amount:</label> {viewModel.amountFormatted}
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

export default OrderItemForm;