import React from 'react';
import DatePicker from './DatePicker.jsx';
import utils from './../utils.jsx';
import Loading from './Loading.jsx';
import NoRecords from './NoRecords.jsx';

class Bounty extends React.Component {
  render() {
    return (
      <li className="bounty">
        <label><span className="rank">#{this.props.rank}</span>{this.props.name}</label>
        <span>₹{this.props.bounty.toFixed(2)}</span>
      </li>
    );
  }
}

class BountyList extends React.Component {
  render() {
    if (this.props.contributors === 'loading') return <Loading />;
    if (this.props.contributors.length < 1) return <NoRecords />;
    var rank = 0, contributors = utils.sortByKey(this.props.contributors, 'expenditure'), total = 0, average = 0;
    var bountyList = contributors.map(function(contributor) {
      total += parseInt(contributor.expenditure);
      return (<Bounty key={contributor._id} rank={++rank} name={contributor.name} bounty={contributor.expenditure} />);
    });
    average = total/rank;
    return (
      <ul className="bounty-list">
        {bountyList}
        <hr/>
        <li className="bounty">
          <label>Total</label>
          <span>₹{total.toFixed(2)}</span>
        </li>
        <li className="bounty">
          <label>Average</label>
          <span>₹{average.toFixed(2)}</span>
        </li>
      </ul>
    );
  }
}

export default class Overview extends React.Component {
  render() {
    return (
      <div className="overview">
        <h2 className="overview-header">
          <label>Bounty</label>
          <DatePicker setDate={this.props.setDate} view="year" />
        </h2>
        <BountyList contributors={this.props.contributors} />
      </div>
    );
  }
}