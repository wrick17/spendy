import React from 'react';
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import services from './../services.jsx';
import Notification from './Notification.jsx';

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
      if (contributors.status) return that.refs.notification.showNotification(contributors.message);
      that.setState({
        contributors: contributors
      });
    });
  }
  getTags() {
    var that = this;
    services.getAllTags(function(tags) {
      if (tags.status) return that.refs.notification.showNotification(tags.message);
      that.setState({
        tags: tags
      });
    });
  }
  getExpenses() {
    var that = this;
    services.getAllEntries(function(expenses) {
      if (expenses.status) return that.refs.notification.showNotification(expenses.message);
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
        <Notification ref="notification" />
      </div>
    );
  }
}