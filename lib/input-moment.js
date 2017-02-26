'use strict';

var cx = require('classnames');
var blacklist = require('blacklist');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: this.props.fixedDate ? 1 : 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      fixedDate: false,
      fixedTime: false
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var noTabs = this.props.fixedDate || this.props.fixedTime;
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'fixedDate', 'fixedTime');
    props.className = cx('m-input-moment', this.props.className);

    return React.createElement(
      'div',
      props,
      !noTabs && React.createElement(
        'div',
        { className: 'options' },
        React.createElement(
          'button',
          { type: 'button', className: cx('ion-calendar im-btn', { 'is-active': tab === 0 }),
            onClick: this.handleClickTab.bind(null, 0) },
          'Date'
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('ion-clock im-btn', { 'is-active': tab === 1 }),
            onClick: this.handleClickTab.bind(null, 1) },
          'Time'
        )
      ),
      React.createElement(
        'div',
        { className: 'tabs' },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === 0 }, { 'no-tabs': noTabs }),
          moment: m,
          onChange: this.props.onChange,
          prevMonthIcon: this.props.prevMonthIcon,
          nextMonthIcon: this.props.nextMonthIcon
        }),
        React.createElement(Time, {
          className: cx('tab', { 'is-active': tab === 1 }, { 'no-tabs': noTabs }, { 'small-height': this.props.fixedDate }),
          moment: m,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        'button',
        { type: 'button', className: 'im-btn btn-save ion-checkmark',
          onClick: this.handleSave },
        'Save'
      )
    );
  },
  handleClickTab: function handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({ tab: tab });
  },
  handleSave: function handleSave(e) {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  }
});