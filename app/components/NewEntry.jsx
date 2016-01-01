import React from 'react';
import DatePicker from './DatePicker.jsx';
import services from './../services.jsx';

class Select extends React.Component {
  render() {
    var that = this;
    var optionList = this.props.options.map(function(option) {
      if (option.hasOwnProperty('active') && !option.active) return null;
      return (<option key={option._id} value={option._id} >{option.name}</option>);
    });
    return (
      <select value={this.props.selectedValue || null} onChange={this.props.onChange}>
        <option value="default" disabled>{this.props.default || 'Choose Option...'}</option>
        {optionList}
      </select>
    );
  }
}

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.onChangeContributor = this.onChangeContributor.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.setDate = this.setDate.bind(this);
    this.state = {
      tagId: this.props.tagId || 'default',
      contributorId: this.props.contributorId || 'default',
      cost: this.props.cost || '',
      item: this.props.item || '',
      date: this.props.date || '',
      tags: [],
      contributors: [],
      error: false,
      submiting: false
    };
  }
  componentDidMount() {
    var that = this;
    services.getAllTags(function(tags) {
      that.setState({
        tags: tags
      });
    });
    services.getAllContributors(function(contributors) {
      that.setState({
        contributors: contributors
      });
    });
  }
  onChangeTag(e) {
    this.setState({
      tagId: e.target.value
    });
  }
  onChangeContributor(e) {
    this.setState({
      contributorId: e.target.value
    });
  }
  onChangeCost(e) {
    this.setState({
      cost: e.target.value
    });
  }
  onChangeItemName(e) {
    this.setState({
      item: e.target.value
    });
  }
  setDate(date) {
    this.setState({
      date: date
    });
  }
  addEntry(e) {
    e.preventDefault();
    var that = this;
    var data = {
      'item': this.state.item,
      'cost': this.state.cost,
      'date': this.state.date,
      'contributorId': this.state.contributorId,
      'tagId': this.state.tagId
    };
    if (this.props.edit) return this.props.updateEntry(data);
    if (data.item !== '' && data.cost !== '' && data.contributorId !== '' && data.tagId !== '' ) {
      this.setState({
        submiting: true
      });
      services.createEntry(data, function(res) {
        that.props.refresh();
        that.setState({
          error: false,
          tagId: 'default',
          contributorId: 'default',
          cost: '',
          item: '',
          date: '',
          submiting: false
        });
      });
    }
    else
      that.setState({
        submiting: false,
        error: true
      });
  }
  render() {
    return (
      <div className="new-entry">
        { this.props.edit ? null : <h2 className="new-entry-header">New Entry</h2> }
        <form className="form" onSubmit={this.addEntry} >
          <div className="form-group">
            <label>Date:</label>
            <DatePicker date={this.state.date} setDate={this.setDate} />
          </div>
          <div className="form-group">
            <label>Cost:</label>
            <input type="number" placeholder="Total Cost" value={this.state.cost} onChange={this.onChangeCost} />
          </div>
          <div className="form-group">
            <label>Item:</label>
            <input type="text" placeholder="Item spent on" value={this.state.item} onChange={this.onChangeItemName} />
          </div>
          <div className="form-group">
            <label>Contributor:</label>
            <Select options={this.state.contributors} default="Choose Contributor" selectedValue={this.state.contributorId} onChange={this.onChangeContributor} />
          </div>
          <div className="form-group">
            <label>Tag:</label>
            <Select options={this.state.tags} default="Choose Tag" selectedValue={this.state.tagId} onChange={this.onChangeTag} />
          </div>
          { this.state.error ? <div className="error right">Please fill out all the details above</div> : null }
          <button className="button right">{this.props.edit ? (this.state.submiting ? 'Saving...' : 'Save') : (this.state.submiting ? 'Adding...' : 'Add')}</button>
        </form>
      </div>
    );
  }
}