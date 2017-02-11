import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from 'react-router';

const ProductForm = ({viewModel, onSave, onChange, saving, errors, onCancel}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={viewModel.entity.name}
        onChange={onChange}
        errors={errors} />

      <TextInput
        name="description"
        label="Description"
        value={viewModel.entity.description}
        onChange={onChange}
        errors={errors} />

      <TextInput
        name="price"
        label="Price"
        value={viewModel.entity.price}
        onChange={onChange}
        errors={errors} />

      <SelectInput
        name="categoryId"
        label="Category"
        value={viewModel.entity.categoryId}
        defaultOption="Select Category..."
        options={viewModel.categorySelectValues}
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