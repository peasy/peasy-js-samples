import React from 'react';

const TextInput = ({name, label, onChange, placeholder, value, errors}) => {

  let wrapperClass = 'form-group';
  if (errors && errors.length > 0) {
    wrapperClass += ' has-error';
  }

  function getError() {
    if (!errors) return;
    var error = errors.find(e => e.association === name);
    if (error) {
      return error.message;
    }
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onChange={onChange} />
        {getError() && <div className="alert alert-danger">{getError()}</div>}
      </div>
    </div>
  );
};

export default TextInput;