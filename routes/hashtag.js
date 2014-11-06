
/*
 * GET hashtags listing.
 */

var util = require('util'),
    twitter = require('twitter'),
    _ = require('underscore'),
    config = require('../config'),
    sample = require('../sample');

var client = new twitter(config.twitter);

exports.search = function (req, res) {
  // request data 
  var tweetStack = [];
  var report = [];

  var startDate = new Date();
  var endDate = new Date();
  var pageIndex = 0;
  var pageSize = 100;
  var maxPages = 15;
  var params = {
    count: pageSize,
    include_entities: false,
    q: '#' + req.params.q + ' since:2014-01-01'
  };

  getMoreData();

  function getMoreData() {
    startDate = new Date();
    client.get('/search/tweets.json', params, getNextPage);
    return this;
  };

  function getNextPage(data) {
    endDate = new Date();
    pageIndex = pageIndex + 1;

    appendTweets(data);

    if (pageIndex >= maxPages || data.statuses.length < pageSize)
      processTweets();
    else {
      params.max_id = _.chain(data.statuses).map(function (status) { return status.id }).min().value();
      startDate = new Date();
      client.get('/search/tweets.json', params, getNextPage);
    }

    return this;
  };

  function appendTweets(data) {
    logReportEntry(data);
    var tweets = mapTweets(data.statuses);
    tweetStack = tweetStack.concat(tweets);
  };

  function logReportEntry(data) {
    var tweets = 0;

    if (data.statuses)
      tweets = data.statuses.length;

    var entry = {
      tweets: tweets,
      max_id: params.max_id,
      seconds: (endDate.getTime() - startDate.getTime()) / 1000
    };

    report.push(entry);
  };

  function mapTweets(statuses) {
    var tweets = _.map(statuses, function (status) {
      var s = {
        hashtags: []
      };

      if (status && status.text)
        s.hashtags = status.text.match(/#\S+/g);

      return s;
    });

    return tweets;
  };

  function processTweets() {
    var hashtags = collectHashtags();
    var result = {
      report: report,
      hashtags: _.first(hashtags, 11)
    };
    res.json(result);
    return this;
  };

  function collectHashtags() {
    var hashtags = [];
    _.each(tweetStack, function (tweet) {
      if (tweet.hashtags)
        hashtags = hashtags.concat(tweet.hashtags);
    });

    return countHashtags(hashtags);
  };

  function countHashtags(hashtags) {

    var summary = _.countBy(hashtags, function (h) {
      return cleanHashtag(h);
    });

    var unique = [];
    for (p in summary) {
      var t = {
        hashtag: p,
        count: summary[p]
      };
      unique.push(t);
    };

    return sortHashtags(unique);
  };

  function cleanHashtag(hashtag) {
    hashtag = hashtag.toLowerCase();
    hashtag = hashtag.replace(/\W/g, '')
    return hashtag;
  };

  function sortHashtags(hashtags) {
    var s = _.sortBy(hashtags, function (t) {
      return -t.count;
    });

    return s;
  };

  return this;
};  