import React from 'react';

const TextInput = ({name, label, onChange, placeholder, value, errors }) => {

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
    <div className={wrapperClass}>
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onChange={onChange} />
        {errorDisplay()}
      </div>
    </div>
  );
};

export default TextInput;