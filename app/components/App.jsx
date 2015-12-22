import React from 'react';
import Header from './Header.jsx';
import Dashboard from './Dashboard.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Dashboard />
      </div>
    );
  }
}