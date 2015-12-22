import React from 'react';
import Logo from './Logo.jsx';
import Container from './Container.jsx';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Container>
          <Logo />
        </Container>
      </header>
    );
  }
}