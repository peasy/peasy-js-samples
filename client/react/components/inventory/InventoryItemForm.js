import React from 'react';
import TextInput from '../common/TextInput';
import { Link } from 'react-router';

const InventoryItemForm = ({viewModel, onSave, onChange, saving, errors, onCancel}) => {
  return (
    <form>

      <div className="form-group">
        <label>Name</label>
        <div>{viewModel.associatedProduct.name}</div> 
      </div>

      <TextInput
        name="quantityOnHand"
        label="Quantity"
        value={viewModel.entity.quantityOnHand}
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

export default InventoryItemForm;