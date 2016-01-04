import React from 'react';
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import services from './../services.jsx';

export default class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.getExpenses = this.getExpenses.bind(this);
    this.getContributors = this.getContributors.bind(this);
    this.getTags = this.getTags.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      expenses: 'loading',
      contributors: 'loading',
      tags: 'loading'
    };
  }
  componentDidMount() {
    this.getExpenses();
    this.getContributors();
    this.getTags();
  }
  getContributors() {
    var that = this;
    services.getAllContributors(function(contributors) {
      that.setState({
        contributors: contributors
      });
    });
  }
  getTags() {
    var that = this;
    services.getAllTags(function(tags) {
      that.setState({
        tags: tags
      });
    });
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
          <ExpensesList expenses={this.state.expenses} contributors={this.state.contributors} tags={this.state.tags} refresh={this.refresh} />
        </Container>
      </div>
    );
  }
}