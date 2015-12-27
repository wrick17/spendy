import React from 'react';
import Logo from './Logo.jsx';
import Container from './Container.jsx';
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Container>
          <Logo />
          <ul className="links">
            <li><Link to="/tag">Tags</Link></li>
            <li><Link to="/contributor">Contributors</Link></li>
          </ul>
        </Container>
      </header>
    );
  }
}