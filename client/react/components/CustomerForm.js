import React from 'react';
import TextInput from './common/TextInput';
// import SelectInput from './common/SelectInput';

const CustomerForm = ({customer, onSave, onChange, saving, errors}) => {
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
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

export default CustomerForm;