import React from 'react';
import TextInput from './common/TextInput';
// import SelectInput from './common/SelectInput';

const CustomerForm = ({customer, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={customer.name}
        onChange={onChange}
        error={errors.title} />
      
      <input
        type="submit"
        value={loading ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

export default CustomerForm;