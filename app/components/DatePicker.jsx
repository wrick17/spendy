import React from 'react';
import DayPicker from "react-date-picker";
import listensToClickOutside from 'react-onclickoutside/decorator';
var today = new Date();

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.state = {
      date: today,
      open: false
    };
  }
  setDate(e, day) {
    this.setState({
      date: day._d
    });
    this.closePicker();
    if (this.props.setDate) this.props.setDate(day._d);
  }
  setMonth(e, month) {
    var month = month._d;
    month.setDate(1);
    this.setState({
      date: month
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
  handleClickOutside(e) {
    this.closePicker();
  }
  render() {
    var value = this.state.date.toString().slice(0, 15);
    if (this.props.view === 'year') value = value.toString().slice(4, 7) + ' ' + value.slice(11, 15);
    return (
      <div className="day-picker">
        <input className="date-picker-input" data-value={this.state.date} value={value} onClick={this.showPicker} disabled />
        { this.state.open ? <DayPicker
          date={this.state.date}
          maxDate={today}
          view={ this.props.view || "month" }
          onSelect={this.setMonth}
          onChange={this.setDate} /> : null }
      </div>
    );
  }
}

export default listensToClickOutside(DatePicker);
