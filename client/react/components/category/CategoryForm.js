import React from 'react';
import TextInput from '../common/TextInput';
// import SelectInput from './common/SelectInput';
import { Link } from 'react-router';

const CategoryForm = ({category, onSave, onChange, saving, errors, onCancel}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={category.name}
        onChange={onChange}
        errors={errors}
        autoFocus={true} />
      
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

export default CategoryForm;