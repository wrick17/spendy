import React from 'react';
import Container from './Container.jsx';
import services from './../services.jsx';
import utils from './../utils.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';
import Modal from './Modal.jsx';
import DeleteModal from './DeleteModal.jsx';

class AddContributor extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeContributorName = this.onChangeContributorName.bind(this);
    this.onAddContributor = this.onAddContributor.bind(this);
    this.state = {
      error: false,
      newContributorName: '',
      submiting: false
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
    if (this.state.newContributorName !== '') {
      this.setState({
        submiting: true
      });
      services.createContributor(data, function(data, res) {
        that.props.refresh();
        that.refs.name.value = '';
        that.setState({
          error: false,
          submiting: false
        });
      });
    }
    else
      this.setState({
        error: true,
        submiting: false
      });
  }
  render() {
    return (
      <div className="add-contributor-container">
        <h2 className="box-header">Add New Contributor</h2>
        <form className="form" onSubmit={this.onAddContributor} >
          <div className="form-group">
            <label>Contributor Name:</label>
            <input type="text" placeholder="Contributor Name..." ref="name" onChange={this.onChangeContributorName} />
          </div>
          { this.state.error ? <div className="error right">Don't be this lazy!</div> : null }
          <button className="button right">{this.state.submiting ? 'Adding...' : 'Add'}</button>
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
    var contributors = utils.sortByKey(this.props.contributors, 'active').map(function(contributor) {
      var classes = 'contributor';
      if (!contributor.active) classes += ' disabled';
      return (
        <li className={classes}  key={contributor._id} >
          <label>{contributor.name}</label>
          <div>
            <a onClick={that.props.editContributor} data-id={contributor._id} data-name={contributor.name} data-active={contributor.active} >Edit</a>
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
    this.changeContributorStatus = this.changeContributorStatus.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      contributors: 'loading',
      isModalOpen: false,
      isDeleteModalOpen: false,
      contributorName: '',
      contributorId: '',
      contributorError: false,
      contributorActive: true,
      submiting: false,
      statusChanging: false
    };
  }
  componentDidMount() {
    this.getAllContributors();
  }
  getAllContributors() {
    var that = this;
    that.setState({
      contributors: 'loading',
      contributorError: false
    });
    services.getAllContributors(function(contributors) {
      that.setState({
        contributors: contributors
      });
    });
  }
  deleteContributor() {
    var that = this;
    that.setState({
      contributors: 'loading'
    });
    services.deleteContributor(this.state.contributorId, function(res) {
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
      contributorId: e.target.dataset.id,
      contributorActive: JSON.parse(e.target.dataset.active)
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
      active: this.state.contributorActive
    }
    var that = this;
    that.setState({
      submiting: true
    });
    if (this.state.contributorName !== '')
      services.updateContributor(this.state.contributorId, data, function(res) {
        that.refresh();
        that.setState({
          submiting: false
        });
        that.closeModal();
      });
    else
      this.setState({
        contributorError: true
      });
  }
  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }
  changeContributorStatus(e) {
    e.preventDefault();
    var data = {
      name: this.state.contributorName,
      active: !this.state.contributorActive
    }
    var that = this;
    if (this.state.contributorName !== '') {
      that.setState({
        statusChanging: true
      });
      services.updateContributor(this.state.contributorId, data, function(res) {
        that.refresh();
        that.setState({
          statusChanging: false
        });
        that.closeModal();
      });
    }
    else
      this.setState({
        contributorError: true
      });

  }
  showDeleteModal(e) {
    this.setState({
      isDeleteModalOpen: true,
      contributorId: e.target.dataset.id
    });
  }
  confirmDelete() {
    this.deleteContributor();
    this.closeDeleteModal();
  }
  closeDeleteModal(e) {
    this.setState({
      isDeleteModalOpen: false
    });
  }
  render() {
    return (
      <div className="add-container">
        <Container>
          <ManageContributor contributors={this.state.contributors} editContributor={this.editContributor} deleteContributor={this.showDeleteModal} />
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
            <button className="button right">{this.state.submiting ? 'Saving...' : 'Save'}</button>
            <button onClick={this.changeContributorStatus} className="button">{this.state.statusChanging ? 'Making' : 'Make'} { this.state.contributorActive ? 'Inactive' : 'Active' } {this.state.statusChanging ? '...' : null}</button>
          </form>
        </Modal>
        <DeleteModal
          open={this.state.isDeleteModalOpen}
          closeModal={this.closeDeleteModal}
          confirmDelete={this.confirmDelete}
          closeDeleteModal={this.closeDeleteModal}
          item="contributor" />
      </div>
    );
  }
}