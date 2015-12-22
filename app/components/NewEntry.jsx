import React from 'react';
import DayPicker from "react-day-picker";

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.state = {
      date: new Date(),
      open: false
    };
  }
  setDate(e, day) {
    this.setState({
      date: day
    });
    this.closePicker();
  }
  showPicker() {
    this.setState({
      open: true
    });
  }
  closePicker() {
    this.setState({
      open: false
    });
  }
  render() {
    return (
      <div className="new-entry">
        <h2 className="new-entry-header">Bounty</h2>
        <form className="entry-form">
          <div className="form-group">
            <label>Date:</label>
            <div className="sub-form">
              <input className="date-picker" data-value={this.state.date} value={this.state.date.toString().slice(0, 15)} onClick={this.showPicker} />
              { this.state.open ? <DayPicker toMonth={new Date()} onDayClick={this.setDate} /> : null }
            </div>
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