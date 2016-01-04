import React from 'react';
import { Link } from 'react-router'

export default class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <Link to="/">
          <label>Spendy</label>
          <span>Beta</span>
        </Link>
      </div>
    );
  }
}