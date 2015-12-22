import React from 'react';
import Overview from './Overview.jsx'
import NewEntry from './NewEntry.jsx'
import Container from './Container.jsx';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <div className="dashboard">
          <Overview />
          <NewEntry />
        </div>
      </Container>
    );
  }
}