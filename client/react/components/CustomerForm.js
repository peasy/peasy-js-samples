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
    </form>
  );
};

export default CustomerForm;