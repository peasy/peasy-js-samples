import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';

const ProductForm = ({product, onSave, onChange, saving, errors, onCancel, categories}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={product.name}
        onChange={onChange}
        errors={errors}
        autoFocus={true} />

      <TextInput
        name="description"
        label="Description"
        value={product.description}
        onChange={onChange}
        errors={errors} />

      <TextInput
        name="price"
        label="Price"
        value={product.price}
        onChange={onChange}
        errors={errors} />

      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId}
        defaultOption="Select Category..."
        options={categories}
        onChange={onChange}
        errors={errors} />

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

export default ProductForm;