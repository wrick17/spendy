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
    function showNotification(message) {
      navigator.serviceWorker.register('sw.js');
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(message, {
          icon: 'https://cdn1.iconfinder.com/data/icons/freeline/32/bell_sound_notification_remind_reminder_ring_ringing_schedule-128.png'
        });
      });
    }
    function notify(message) {
      if (!("Notification" in window)) {
        return false;
      }
      else if (window.Notification.permission === "granted") {
        showNotification(message);
        return true;
      }
      else if (window.Notification.permission !== 'denied') {
        window.Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            showNotification(message);
            return true;
          }
          else
            return false;
        });
      }
      else
        return false;
    }
    if (!notify(message)) {
      this.setState({
        open: true,
        message: message
      });
      var that = this;
      setTimeout(function() {
        that.closeModal();
      }, 2000);
    }
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