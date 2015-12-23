import React from 'react';
import DatePicker from './DatePicker.jsx';

export default class NewEntry extends React.Component {
  setDate(date) {

  }
  render() {
    return (
      <div className="new-entry">
        <h2 className="new-entry-header">New Entry</h2>
        <form className="entry-form">
          <div className="form-group">
            <label>Date:</label>
            <DatePicker setDate={this.setDate} />
          </div>
          <div className="form-group">
            <label>Cost:</label>
            <input type="number" placeholder="Total Cost" />
          </div>
          <div className="form-group">
            <label>Item:</label>
            <input type="text" placeholder="Item spent on" />
          </div>
          <div className="form-group">
            <label>Contributer:</label>
            <select>
              <option disabled>Choose Contributer</option>
              <option>Sayan</option>
              <option>Abhishek</option>
              <option>Pratyush</option>
              <option>Utsav</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tag:</label>
            <select>
              <option disabled>Choose Tag</option>
              <option>Groceries</option>
              <option>Entertainment</option>
              <option>Extra Foodies</option>
              <option>Bills</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}