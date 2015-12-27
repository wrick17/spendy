import React from 'react';
import Overview from './Overview.jsx'
import NewEntry from './NewEntry.jsx'
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import DatePicker from './DatePicker.jsx';
import services from './../services.jsx';
import { Link } from 'react-router'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getExpenses = this.getExpenses.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      expenses: []
    };
  }
  componentDidMount() {
    this.getExpenses();
  }
  getExpenses() {
    var that = this;
    services.getAllEntries(function(expenses) {
      that.setState({
        expenses: expenses
      });
    });
  }
  refresh() {
    this.getExpenses();
  }
  render() {
    return (
      <div className="dashboard-container">
        <Container>
          <div className="dashboard">
            <Overview />
            <NewEntry refresh={this.refresh} />
          </div>
          <div className="expenses-container">
            <h2 className="expenses-header"><label>Expenses for the month<Link to="/expenses">(see all)</Link></label><DatePicker setDate={this.setDate} view="year" /></h2>
            <ExpensesList expenses={this.state.expenses} refresh={this.refresh} />
          </div>
        </Container>
      </div>
    );
  }
}