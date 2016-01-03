import React from 'react';
import Modal from './Modal.jsx';

export default class Notification extends React.Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        closeModal={this.props.closeDeleteModal}>
        <label className="message">{this.props.message}</label>
      </Modal>
    );
  }
}