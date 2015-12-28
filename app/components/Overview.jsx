import React from 'react';
import DatePicker from './DatePicker.jsx';
import utils from './../utils.jsx';

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
    var rank = 1, contributors = utils.sortByKey(this.props.contributors, 'expenditure');
    var bountyList = contributors.map(function(contributor) {
      return (<Bounty key={contributor._id} rank={rank++} name={contributor.name} bounty={contributor.expenditure} />);
    });
    return (
      <ul className="bounty-list">
        {bountyList}
      </ul>
    );
  }
}

export default class Overview extends React.Component {
  render() {
    return (
      <div className="overview">
        <h2 className="overview-header"><label>Bounty</label><DatePicker setDate={this.setDate} view="year" /></h2>
        <BountyList contributors={this.props.contributors} />
      </div>
    );
  }
}