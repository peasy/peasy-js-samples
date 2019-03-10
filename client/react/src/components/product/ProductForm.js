import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

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

export default ProductForm;