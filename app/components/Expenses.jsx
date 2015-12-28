import React from 'react';
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import services from './../services.jsx';

export default class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.getExpenses = this.getExpenses.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      expenses: 'loading'
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
      <div className="expenses-page">
        <Container>
          <ExpensesList expenses={this.state.expenses} refresh={this.refresh} />
        </Container>
      </div>
    );
  }
}