import React from 'react';
import services from './../services.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';
import utils from './../utils.jsx';
import Modal from './Modal.jsx';

class ExpenseGroup extends React.Component {
  render() {
    var that = this;
    var expenseGroup = utils.sortByKey(this.props.expenseGroup.items.reverse(), 'date').map(function(expense) {
      var date = new Date(expense.date);
      var displayDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() ;
      return (
        <tr key={expense._id}>
          <td data-label="Date">{displayDate}</td>
          <td data-label="Cost">₹{expense.cost}</td>
          <td data-label="Item">{expense.item}</td>
          <td data-label="Contributor">{that.props.contributorMap[expense.contributorId] || 'Loading..'}</td>
          <td data-label="Tag">{that.props.tagMap[expense.tagId] || 'Loading..'}</td>
          <td data-label="Actions" className="actions">
            <div onClick={that.props.editEntry} data-id={expense._id} >Edit</div>
            <div onClick={that.props.deleteEntry} data-id={expense._id} >Delete</div>
          </td>
        </tr>
      );
    });
    return (
      <tbody>
        <tr className="month-header">
          <td data-label="Month" colSpan="6">{this.props.expenseGroup.month}</td>
        </tr>
        {expenseGroup}
      </tbody>
    );
  }
}

class ExpenseTable extends React.Component {
  render() {
    if (this.props.expenses === 'loading') return <Loading />;
    if (this.props.expenses.length < 1) return <NoRecords />;
    var that = this;
    var expenseGroups = utils.groupByMonth(this.props.expenses).map(function(expenseGroup) {
      return <ExpenseGroup
                key={expenseGroup.month}
                expenseGroup={expenseGroup}
                contributorMap={that.props.contributorMap}
                tagMap={that.props.tagMap}
                editEntry={that.props.editEntry}
                deleteEntry={that.props.deleteEntry} />
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
        {expenseGroups}
      </table>
    );
  }
}

export default class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      tagMap: [],
      contributorMap: [],
      isModalOpen: false
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
  showModal() {
    this.setState({
      isModalOpen: true
    });
  }
  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }
  render() {
    return (
      <div>
        <ExpenseTable
          expenses={this.props.expenses}
          contributorMap={this.state.contributorMap}
          tagMap={this.state.tagMap}
          editEntry={this.showModal}
          deleteEntry={this.deleteEntry} />
        <Modal
          title="Edit Expense"
          open={this.state.isModalOpen}
          closeModal={this.closeModal} >

        </Modal>
      </div>
    );
  }
}