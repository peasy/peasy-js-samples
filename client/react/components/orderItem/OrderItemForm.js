import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';

const OrderItemForm = ({vm, onSave, onChange, saving, errors, onCancel }) => {
  return (
    <form>
      <SelectInput
        name="categoryId"
        label="Category"
        value={vm.categoryId}
        defaultOption="Select Category..."
        options={vm.categories.map(c => { return { text: c.name, value: c.id }})}
        onChange={onChange}
        errors={errors} />

      <SelectInput
        name="productId"
        label="Product"
        value={vm.productId}
        defaultOption="Select Product..."
        options={vm.products.map(c => { return { text: c.name, value: c.id }})}
        onChange={onChange}
        errors={errors} />

      <div className="form-group">
        <label>In Stock:</label> {20}
      </div>

      <div className="form-group">
        <label>Price:</label> {vm.price}
      </div>

      <TextInput
        name="quantity"
        label="Quantity"
        value={vm.quantity}
        onChange={onChange}
        errors={errors} />

      <div className="form-group">
        <label>Amount:</label> {vm.amount}
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