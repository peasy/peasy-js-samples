import React, { PropTypes } from 'react';

class CustomersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      customer: { name: "" }
    };
  }

  onNameChange(event) {
    const customer = this.state.customer;
    customer.name = event.target.value;
    this.setState({ customer: customer });
  }

  onSave() {
    console.log(`Saving ${this.state.customer.name}`);
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <h2>Add customer</h2>
        <input 
          type="text"
          onChange={this.onNameChange}
          value={this.state.customer.name}
          />
        <input 
          type="submit"
          onClick={this.onSave}
          value="Save"
          />
      </div>
    );
  }
}

export default CustomersView;
