import React from 'react';
import services from './../services.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';

class ExpenseTable extends React.Component {
  render() {
    if (this.props.expenses === 'loading') return <Loading />;
    if (this.props.expenses.length < 1) return <NoRecords />;
    var that = this;
    var expenses = this.props.expenses.map(function(expense) {
      return (
        <tr key={expense._id}>
          <td data-label="Date">{expense.date.toString().slice(0, 10).split('-').reverse().join('/')}</td>
          <td data-label="Cost">₹{expense.cost}</td>
          <td data-label="Item">{expense.item}</td>
          <td data-label="Contributor">{that.props.contributorMap[expense.contributorId] || 'Loading..'}</td>
          <td data-label="Tag">{that.props.tagMap[expense.tagId] || 'Loading..'}</td>
          <td data-label="Actions" className="actions">
            <div onClick={that.props.deleteEntry} data-id={expense._id} >Delete</div>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Cost</th>
            <th>Item</th>
            <th>Contributor</th>
            <th>Tag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses}
        </tbody>
      </table>
    );
  }
}

export default class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.state = {
      tagMap: [],
      contributorMap: []
    };
  }
  componentDidMount() {
    var that = this;
    var tagMap = {};
    var contributorMap = {};
    services.getAllTags(function(tags) {
      tags.map(function(tag) {
        tagMap[tag._id] = tag.name;
      });
      that.setState({
        tagMap: tagMap
      });
    });
    services.getAllContributors(function(contributors) {
      contributors.map(function(contributor) {
        contributorMap[contributor._id] = contributor.name;
      });
      that.setState({
        contributorMap: contributorMap
      });
    });
  }
  deleteEntry(e) {
    var that = this;
    services.deleteEntry(e.target.dataset.id, function(res) {
      if (that.props.refresh) that.props.refresh();
    });
  }
  render() {
    return (
      <ExpenseTable expenses={this.props.expenses} contributorMap={this.state.contributorMap} tagMap={this.state.tagMap} deleteEntry={this.deleteEntry} />
    );
  }
}