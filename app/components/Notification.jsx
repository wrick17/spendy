import React from 'react';
import Modal from './Modal.jsx';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false,
      message: ''
    }
  }
  showNotification(message) {
    this.setState({
      open: true,
      message: message
    });
  }
  closeModal() {
    this.setState({
      open: false
    });
  }
  render() {
    return (
      <Modal
        open={this.state.open}
        closeModal={this.closeModal}>
        <label className="message">{this.state.message}</label>
      </Modal>
    );
  }
}