import React from 'react';
import services from './../services.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';
import utils from './../utils.jsx';
import Modal from './Modal.jsx';
import NewEntry from './NewEntry.jsx';
import DeleteModal from './DeleteModal.jsx';
import Select from './Select.jsx';

class ExpenseGroup extends React.Component {
  render() {
    var that = this;
    var expenseGroup = utils.sortByKey(this.props.expenseGroup.items, 'date').map(function(expense) {
      var date = new Date(expense.date);
      var displayDate = utils.zeroPadding(date.getDate()) + '-' + utils.zeroPadding(date.getMonth() + 1) + '-' + date.getFullYear() ;
      return (
        <tr key={expense._id}>
          <td data-label="Date">{displayDate}</td>
          <td data-label="Cost">₹{expense.cost}</td>
          <td data-label="Item">{expense.item}</td>
          <td data-label="Contributor">{expense.contributorName || 'Loading..'}</td>
          <td data-label="Tag">{expense.tagName || 'Loading..'}</td>
          <td data-label="Actions" className="actions">
            <div onClick={that.props.editEntry}
                data-cost={expense.cost}
                data-item={expense.item}
                data-contributor={expense.contributorId}
                data-tag={expense.tagId}
                data-date={expense.date}
                data-id={expense._id} >Edit</div>
            <div onClick={that.props.deleteEntry} data-id={expense._id} >Delete</div>
          </td>
        </tr>
      );
    });
    return (
      <tbody>
        { that.props.minimal ? <tr className="hidden"></tr> : <tr className="month-header">
                  <td data-label="Month" colSpan="6">{this.props.expenseGroup.month}</td>
                </tr> }
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
                minimal={that.props.minimal}
                key={expenseGroup.month}
                expenseGroup={expenseGroup}
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

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeContributor = this.onChangeContributor.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
  }
  onChangeContributor(e) {
    this.props.filterByContributor(e.target.value);
  }
  onChangeTag(e) {
    this.props.filterByTag(e.target.value);
  }
  render() {
    return (
      <div className="filter-bar">
        <div className="filter-group">
          <label>Show all expenses by</label>
          <Select default="Everyone" noDisabled options={this.props.contributors} selectedValue={this.props.selectedValueContributor} onChange={this.onChangeContributor} />
        </div>
        <div className="filter-group">
          <label>for</label>
          <Select default="Everything" noDisabled options={this.props.tags} selectedValue={this.props.selectedValueTag} onChange={this.onChangeTag} />
        </div>
      </div>
    );
  }
}

export default class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.filterByContributor = this.filterByContributor.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.filterExpenses = this.filterExpenses.bind(this);
    this.state = {
      id: '',
      contributors: this.props.contributors,
      tags: this.props.tags,
      isModalOpen: false,
      isDeleteModalOpen: false,
      date: '',
      cost: '',
      item: '',
      contributorId: '',
      tagId: '',
      expenses: this.props.expenses
    };
  }
  componentDidMount() {
    var that = this;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      expenses: nextProps.expenses,
      contributorId: 'default',
      tagId: 'default',
      contributors: nextProps.contributors,
      tags: nextProps.tags
    });
  }
  deleteEntry() {
    var that = this;
    services.deleteEntry(this.state.id, function(res) {
      if (that.props.refresh) that.props.refresh();
    });
  }
  editEntry(e) {
    this.setState({
      isModalOpen: true,
      id: e.target.dataset.id,
      date: new Date(e.target.dataset.date),
      cost: e.target.dataset.cost,
      item: e.target.dataset.item,
      contributorId: e.target.dataset.contributor,
      tagId: e.target.dataset.tag
    });
  }
  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }
  updateEntry(data) {
    var that = this;
    services.updateEntry(this.state.id, data, function(res) {
      that.closeModal();
      if (that.props.refresh) that.props.refresh();
    });
  }
  showDeleteModal(e) {
    this.setState({
      isDeleteModalOpen: true,
      id: e.target.dataset.id
    });
  }
  confirmDelete() {
    this.deleteEntry();
    this.closeDeleteModal();
  }
  closeDeleteModal(e) {
    this.setState({
      isDeleteModalOpen: false
    });
  }
  filterExpenses(contributorId, tagId) {
    function contributorDefault(contributorId) {
      return (contributorId === 'default' || contributorId === '') ? true : false;
    }
    function tagDefault(tagId) {
      return (tagId === 'default' || tagId === '') ? true : false;
    }
    var expenses = this.props.expenses, expensesFiltered = expenses, that = this;
    if (contributorDefault(contributorId) && tagDefault(tagId)) return this.setState({
      expenses: expenses
    });
    if (!contributorDefault(contributorId)) {
      expensesFiltered = expenses.filter(function(expense) {
        return expense.contributorId === contributorId;
      });
      expenses = expensesFiltered;
    }
    if (!tagDefault(tagId)) {
      expensesFiltered = expenses.filter(function(expense) {
        return expense.tagId === tagId;
      });
      expenses = expensesFiltered;
    }
    this.setState({
      expenses: expenses
    });
  }
  filterByContributor(contributorId) {
    this.setState({
      contributorId: contributorId
    });
    this.filterExpenses(contributorId, this.state.tagId);
  }
  filterByTag(tagId) {
    this.setState({
      tagId: tagId
    });
    this.filterExpenses(this.state.contributorId, tagId);
  }
  render() {
    return (
      <div>
        <FilterBar
          contributors={this.state.contributors}
          tags={this.state.tags}
          filterByTag={this.filterByTag}
          selectedValueContributor={this.state.contributorId}
          selectedValueTag={this.state.tagId}
          filterByContributor={this.filterByContributor} />
        <ExpenseTable
          expenses={this.state.expenses}
          editEntry={this.editEntry}
          minimal={this.props.minimal}
          deleteEntry={this.showDeleteModal} />
        <Modal
          title="Edit Expense"
          open={this.state.isModalOpen}
          closeModal={this.closeModal} >
          <NewEntry
            item={this.state.item}
            date={this.state.date}
            cost={this.state.cost}
            contributors={this.state.contributors}
            tags={this.state.tags}
            contributorId={this.state.contributorId}
            tagId={this.state.tagId}
            updateEntry={this.updateEntry}
            edit={true}/>
        </Modal>
        <DeleteModal
          open={this.state.isDeleteModalOpen}
          closeModal={this.closeDeleteModal}
          confirmDelete={this.confirmDelete}
          closeDeleteModal={this.closeDeleteModal}
          item="expense" />
      </div>
    );
  }
}