import React from 'react';
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';

export default class Expenses extends React.Component {
  render() {
    return (
      <div className="expenses-page">
        <Container>
          <ExpensesList />
        </Container>
      </div>
    );
  }
}