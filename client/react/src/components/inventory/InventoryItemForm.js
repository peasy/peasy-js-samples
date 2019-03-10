import React from 'react';
import TextInput from '../common/TextInput';

const InventoryItemForm = ({viewModel, onSave, onChange, saving, errors, onCancel}) => {
  return (
    <form>

      <div className="form-group">
        <label className="form-label">Name</label>
        <div>{viewModel.associatedProduct.name}</div>
      </div>

      <TextInput
        name="quantityOnHand"
        label="Quantity"
        value={viewModel.entity.quantityOnHand}
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

export default InventoryItemForm;