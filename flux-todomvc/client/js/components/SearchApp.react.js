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

var MainSection = require('./MainSection.react');
var React = require('react');
var RestaurantStore = require('../stores/RestaurantStore');
var SearchBox = require('./searchBox.react');

/**
 * Retrieve the current Term data from the TermStore
 */
function getAllState() {
   return {
     restaurants : RestaurantStore.getAll(),
   }
}

var SearchApp = React.createClass({

  getInitialState: function() {
    return getAllState();
  },

  componentDidMount: function() {
    RestaurantStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RestaurantStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <SearchBox />
        <table><MainSection restaurants={this.state.restaurants}  /></table>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TermStore
   */
  _onChange: function() {
    this.setState(getAllState());
  }

});

module.exports = SearchApp;
