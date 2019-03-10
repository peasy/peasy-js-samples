import React from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, errors, options}) => {

  let wrapperClass = 'form-group';
  if (getError()) {
    wrapperClass += ' has-error';
  }

  function getError() {
    if (!errors) return;
    var error = errors.find(e => e.association === name);
    if (error) {
      return error.message;
    }
  }

  function errorDisplay() {
    var error = getError();
    if (error) {
      return (
        <div className="alert alert-danger">{error}</div>
      );
    }
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="field">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control">
          <option value="">{defaultOption}</option>
          {
            options.map((option) => {
              return <option key={option.value} value={option.value}>{option.text}</option>
            })
          }
        </select>
        {errorDisplay()}
      </div>
    </div>
  );
};

export default SelectInput;