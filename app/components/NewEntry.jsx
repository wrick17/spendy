import React from 'react';
import DatePicker from './DatePicker.jsx';
import services from './../services.jsx';

class ChooseContributor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: []
    };
  }
  componentDidMount() {
    var that = this;
    services.getAllContributers(function(contributors) {
      var contributorsList = contributors.map(function(contributor) {
        return (<option key={contributor._id} value={contributor._id} >{contributor.name}</option>)
      });
      that.setState({
        contributors: contributorsList
      });
    });
  }
  render() {
    return (
      <select onChange={this.props.onChange}>
        <option disabled>Choose Contributer...</option>
        {this.state.contributors}
      </select>
    );
  }
}

class ChooseTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }
  componentDidMount() {
    var that = this;
    services.getAllTags(function(tags) {
      var tagsList = tags.map(function(tag) {
        return (<option key={tag._id} value={tag._id} >{tag.name}</option>)
      });
      that.setState({
        tags: tagsList
      });
    });
  }
  render() {
    return (
      <select onChange={this.props.onChange}>
        <option disabled>Choose Tag...</option>
        {this.state.tags}
      </select>
    );
  }
}

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTag = this.onChangeTag.bind(this);
  }
  onChangeTag(e) {
    console.log('tag ', e.target.value);
  }
  onChangeContributor(e) {
    console.log('contributor ', e.target.value);
  }
  render() {
    return (
      <div className="new-entry">
        <h2 className="new-entry-header">New Entry</h2>
        <form className="entry-form">
          <div className="form-group">
            <label>Date:</label>
            <DatePicker setDate={this.setDate} />
          </div>
          <div className="form-group">
            <label>Cost:</label>
            <input type="number" placeholder="Total Cost" />
          </div>
          <div className="form-group">
            <label>Item:</label>
            <input type="text" placeholder="Item spent on" />
          </div>
          <div className="form-group">
            <label>Contributer:</label>
            <ChooseContributor onChange={this.onChangeContributor} />
          </div>
          <div className="form-group">
            <label>Tag:</label>
            <ChooseTags onChange={this.onChangeTag} />
          </div>
        </form>
      </div>
    );
  }
}