import React from 'react';
import Overview from './Overview.jsx'
import NewEntry from './NewEntry.jsx'
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import DatePicker from './DatePicker.jsx';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <Container>
          <div className="dashboard">
            <Overview />
            <NewEntry />
          </div>
          <div className="expenses-container">
            <h2 className="expenses-header"><label>Expenses for the month</label><DatePicker setDate={this.setDate} view="year" /></h2>
            <ExpensesList />
          </div>
        </Container>
      </div>
    );
  }
}