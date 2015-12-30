import React from 'react';
import Modal from './Modal.jsx';

export default class DeleteModal extends React.Component {
  render() {
    return (
      <Modal
        title="Confirm Delete"
        open={this.props.open}
        closeModal={this.props.closeDeleteModal}>
        <label className="message">Are you sure you want to delete this {this.props.item}?</label>
        <div>
          <button className="button right" onClick={this.props.confirmDelete} >Delete</button>
          <button className="button" onClick={this.props.closeDeleteModal} >Cancel</button>
        </div>
      </Modal>
    );
  }
}