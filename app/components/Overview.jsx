import React from 'react';

class Bounty extends React.Component {
  render() {
    return (
      <li className="bounty">
        <label><span className="rank">#{this.props.rank}</span>{this.props.name}</label>
        <span>₹{this.props.bounty}</span>
      </li>
    );
  }
}

class BountyList extends React.Component {
  render() {
    return (
      <ul className="bounty-list">
        <Bounty rank="1" name="Sayan" bounty="1480" />
        <Bounty rank="2" name="Abhishek" bounty="1320" />
        <Bounty rank="3" name="Pratyush" bounty="100" />
        <Bounty rank="4" name="Utsav" bounty="0" />
      </ul>
    );
  }
}

export default class Overview extends React.Component {
  render() {
    return (
      <div className="overview">
        <h2 className="overview-header">Bounty</h2>
        <BountyList />
      </div>
    );
  }
}