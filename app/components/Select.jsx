import React from 'react';

export default class Select extends React.Component {
  render() {
    var that = this;
    var optionList = this.props.options.map(function(option) {
      if (option.hasOwnProperty('active') && !option.active) return null;
      return (<option key={option._id} value={option._id} >{option.name}</option>);
    });
    return (
      <select value={this.props.selectedValue || null} onChange={this.props.onChange}>
        <option value="default" disabled={!this.props.noDisabled} >{this.props.default || 'Choose Option...'}</option>
        {optionList}
      </select>
    );
  }
}