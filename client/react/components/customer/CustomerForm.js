import React from 'react';
import TextInput from '../common/TextInput';
import { Link } from 'react-router';

const CustomerForm = ({customer, onSave, onChange, saving, errors, onCancel}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={customer.name}
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

export default CustomerForm;