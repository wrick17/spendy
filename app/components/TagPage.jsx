import React from 'react';
import Container from './Container.jsx';
import services from './../services.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTagName = this.onChangeTagName.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.state = {
      error: false,
      newTagName: ''
    };
  }
  onChangeTagName(e) {
    this.setState({
      newTagName: e.target.value
    });
  }
  onAddTag(e) {
    e.preventDefault();
    var that = this;
    var data = {
      'name': this.state.newTagName
    }
    if (this.state.newTagName !== '')
      services.createTag(data, function(data, res) {
        that.props.refresh();
        that.setState({
          error: false
        });
      });
    else
      this.setState({
        error: true
      });
  }
  render() {
    return (
      <div className="add-tag-container">
        <h2 className="box-header">Add new Tag</h2>
        <form className="form" onSubmit={this.onAddTag} >
          <div className="form-group">
            <label>Tag Name:</label>
            <input type="text" placeholder="Tag Name..." onChange={this.onChangeTagName} />
          </div>
          { this.state.error ? <div className="error right">Don't be this lazy!</div> : null }
          <button className="button right">Add</button>
        </form>
      </div>
    );
  }
}

class ManageTagList extends React.Component {
  render() {
    if (this.props.tags === 'loading') return <Loading />;
    if (this.props.tags.length < 1) return <NoRecords />;
    var that = this;
    var tags = this.props.tags.map(function(tag) {
      return (
        <li className="tag" key={tag._id} >
          <label>{tag.name}</label>
          <div>
            <a onClick={that.props.deleteTag} data-id={tag._id} >Delete</a>
          </div>
        </li>
      );
    });
    return (
      <ul className="tag-list">
        {tags}
      </ul>
    );
  }
}

class ManageTag extends React.Component {
  render() {
    return (
      <div className="manage-tag-container">
        <h2 className="box-header">Manage Tags</h2>
        <ManageTagList tags={this.props.tags} />
      </div>
    );
  }
}

export default class TagPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTag = this.deleteTag.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      tags: 'loading'
    };
  }
  componentDidMount() {
    this.getAllTags();
  }
  getAllTags() {
    var that = this;
    services.getAllTags(function(tags) {
      that.setState({
        tags: tags
      });
    });
  }
  deleteTag(e) {
    var that = this;
    services.deleteTag(e.target.dataset.id, function(res) {
      that.getAllTags();
    });
  }
  refresh() {
    this.getAllTags();
  }
  render() {
    return (
      <div className="add-container">
        <Container>
          <ManageTag tags={this.state.tags} deleteTag={this.deleteTag} />
          <AddTag refresh={this.refresh} />
        </Container>
      </div>
    );
  }
}