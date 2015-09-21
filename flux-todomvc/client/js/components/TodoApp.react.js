/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TermStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TermStore = require('../stores/TermStore');

/**
 * Retrieve the current Term data from the TermStore
 */
function getTermState() {
  return {
    options: TermStore.getAll(),
    term : ""
  };
}

var TermApp = React.createClass({

  getInitialState: function() {
    return getTermState();
  },

  componentDidMount: function() {
    TermStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TermStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTerms={this.state.allTerms}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTerms={this.state.allTerms} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TermStore
   */
  _onChange: function() {
    this.setState(getTermState());
  }

});

module.exports = TermApp;
