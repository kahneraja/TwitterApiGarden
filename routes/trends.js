
/*
 * GET hashtags listing.
 */

var util = require('util'),
    twitter = require('twitter'),
    _ = require('underscore'),
    config = require('../config'),
    sample = require('../sample');

var client = new twitter(config.twitter);

exports.index = function (req, res) {

  getTrends();

  function getTrends() {
    client.get('/trends/place.json', { id: 1 }, processTrends);
  };

  function processTrends(data) {
    var trends = _.first(data).trends;
    trends = _.reject(trends, function (trend) {
      return (trend.name.indexOf(" ") >= 0);
    });
    trends = _.map(trends, function (trend) {
      trend.name = trend.name.replace('#', '');
      return trend;
    });
    res.json(trends);
  };

  return this;
};  