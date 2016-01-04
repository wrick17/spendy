import React from 'react';
import Overview from './Overview.jsx'
import NewEntry from './NewEntry.jsx'
import Container from './Container.jsx';
import ExpensesList from './ExpensesList.jsx';
import DatePicker from './DatePicker.jsx';
import services from './../services.jsx';
import { Link } from 'react-router'
import utils from './../utils.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getExpenses = this.getExpenses.bind(this);
    this.getOverview = this.getOverview.bind(this);
    this.refresh = this.refresh.bind(this);
    this.setDateExpenses = this.setDateExpenses.bind(this);
    this.setDateBounty = this.setDateBounty.bind(this);
    this.getTags = this.getTags.bind(this);
    this.state = {
      expenses: 'loading',
      contributors: 'loading',
      tags: 'loading',
      overviewDate: new Date(),
      expensesDate: new Date()
    };
  }
  componentWillMount() {
    this.getTags();
  }
  getTags() {
    var that = this;
    services.getAllTags(function(tags) {
      that.setState({
        tags: tags
      });
    });
  }
  getExpenses(date = this.state.expensesDate) {
    var that = this;
    that.setState({
      expenses: 'loading'
    });
    services.getAllEntries(function(expenses) {
      that.setState({
        expenses: expenses
      });
    }, date);
  }
  getOverview(date = this.state.overviewDate) {
    var that = this;
    that.setState({
      contributors: 'loading'
    });
    services.getAllContributors(function(contributors) {
      that.setState({
        contributors: contributors
      });
    }, date);
  }
  refresh() {
    this.getExpenses();
    this.getOverview();
  }
  setDateBounty(date) {
    this.setState({
      overviewDate: date
    });
    this.getOverview(date);
  }
  setDateExpenses(date) {
    this.setState({
      expensesDate: date
    });
    this.getExpenses(date);
  }
  render() {
    return (
      <div className="dashboard-container">
        <Container>
          <div className="dashboard">
            <Overview contributors={this.state.contributors} setDate={this.setDateBounty} />
            <NewEntry refresh={this.refresh} contributors={this.state.contributors} tags={this.state.tags} />
          </div>
          <div className="expenses-container">
            <h2 className="expenses-header" onClick={this.showModal} >
              <label>Expenses for the month<Link to="/expenses">(see all)</Link></label>
              <DatePicker setDate={this.setDateExpenses} view="year" />
            </h2>
            <ExpensesList minimal={true} expenses={this.state.expenses} refresh={this.refresh} />
          </div>
        </Container>
      </div>
    );
  }
}