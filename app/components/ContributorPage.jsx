import React from 'react';
import Container from './Container.jsx';
import services from './../services.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';
import Modal from './Modal.jsx';

class AddContributor extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeContributorName = this.onChangeContributorName.bind(this);
    this.onAddContributor = this.onAddContributor.bind(this);
    this.state = {
      error: false,
      newContributorName: ''
    };
  }
  onChangeContributorName(e) {
    this.setState({
      newContributorName: e.target.value
    });
  }
  onAddContributor(e) {
    e.preventDefault();
    var that = this;
    var data = {
      'name': this.state.newContributorName,
      'active': true
    }
    if (this.state.newContributorName !== '')
      services.createContributor(data, function(data, res) {
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
      <div className="add-contributor-container">
        <h2 className="new-contributor-header">Add new Contributor</h2>
        <form className="form" onSubmit={this.onAddContributor} >
          <div className="form-group">
            <label>Contributor Name:</label>
            <input type="text" placeholder="Contributor Name..." onChange={this.onChangeContributorName} />
          </div>
          { this.state.error ? <div className="error right">Don't be this lazy!</div> : null }
          <button className="button right">Add</button>
        </form>
      </div>
    );
  }
}

class ManageContributorList extends React.Component {
  render() {
    if (this.props.contributors === 'loading') return <Loading />;
    if (this.props.contributors.length < 1) return <NoRecords />;
    var that = this;
    var contributors = this.props.contributors.map(function(contributor) {
      return (
        <li className="contributor" key={contributor._id} >
          <label>{contributor.name}</label>
          <div>
            <a onClick={that.props.editContributor} data-id={contributor._id} data-name={contributor.name} >Edit</a>
            <a onClick={that.props.deleteContributor} data-id={contributor._id} >Delete</a>
          </div>
        </li>
      );
    });
    return (
      <ul className="contributor-list">
        {contributors}
      </ul>
    );
  }
}

class ManageContributor extends React.Component {
  render() {
    return (
      <div className="manage-contributor-container">
        <h2 className="box-header">Manage contributors</h2>
        <ManageContributorList contributors={this.props.contributors} editContributor={this.props.editContributor} deleteContributor={this.props.deleteContributor} />
      </div>
    );
  }
}

export default class ContributorPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteContributor = this.deleteContributor.bind(this);
    this.getAllContributors = this.getAllContributors.bind(this);
    this.editContributor = this.editContributor.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSaveContributor = this.onSaveContributor.bind(this);
    this.onChangeContributorName = this.onChangeContributorName.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      contributors: 'loading',
      isModalOpen: false,
      contributorName: '',
      contributorId: '',
      contributorError: false
    };
  }
  componentDidMount() {
    this.getAllContributors();
  }
  getAllContributors() {
    var that = this;
    that.setState({
      contributors: 'loading'
    });
    services.getAllContributors(function(contributors) {
      that.setState({
        contributors: contributors
      });
    });
  }
  deleteContributor(e) {
    e.preventDefault();
    var that = this;
    that.setState({
      contributors: 'loading'
    });
    services.deleteContributor(e.target.dataset.id, function(res) {
      that.getAllContributors();
    });
  }
  refresh() {
    this.getAllContributors();
  }
  editContributor(e) {
    this.setState({
      isModalOpen: true,
      contributorName: e.target.dataset.name,
      contributorId: e.target.dataset.id
    });
  }
  onChangeContributorName(e) {
    this.setState({
      contributorName: e.target.value
    })
  }
  onSaveContributor(e) {
    e.preventDefault();
    var data = {
      name: this.state.contributorName,
      active: true
    }
    var that = this;
    services.updateContributor(this.state.contributorId, data, function(res) {
      console.log(res);
      that.refresh();
      that.closeModal();
    });
  }
  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }
  render() {
    return (
      <div className="add-container">
        <Container>
          <ManageContributor contributors={this.state.contributors} editContributor={this.editContributor} deleteContributor={this.deleteContributor} />
          <AddContributor refresh={this.refresh} />
        </Container>
        <Modal
          title="Edit Contributor"
          open={this.state.isModalOpen}
          closeModal={this.closeModal} >
          <form className="form" onSubmit={this.onSaveContributor} >
            <div className="form-group">
              <label>Contributor Name:</label>
              <input type="text" placeholder="Contributor Name..." value={this.state.contributorName} data-id={this.state.contributorId} onChange={this.onChangeContributorName} />
            </div>
            { this.state.contributorError ? <div className="error right">Don't be this lazy!</div> : null }
            <button className="button right">Save</button>
          </form>
        </Modal>
      </div>
    );
  }
}