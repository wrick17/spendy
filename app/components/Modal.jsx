import React from 'react';
import SkyLight from 'react-skylight';
import Container from './Container.jsx';

class ModalBody extends React.Component {
  render() {
    return (
      <div className="modal">
        <Container>
          <h2 className="modal-title">{this.props.title || null}</h2>
          <a onClick={this.props.closeModal} className="close-modal">close</a>
          {this.props.content}
        </Container>
      </div>
    );
  }
}

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal(e) {
    e.preventDefault();
    this.props.closeModal();
  }
  render() {
    return (
      <div className="modal-wrapper" >
        { this.props.open ? <div className="modal-backdrop" onClick={this.closeModal} ></div> : null}
        { this.props.open ? <ModalBody closeModal={this.closeModal} title={this.props.title} content={this.props.children} /> : null}
      </div>
    );
  }
}