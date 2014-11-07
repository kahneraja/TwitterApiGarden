TwitterApiGarden = {
  init: function () {
    // data
    TwitterApiGarden.Hashtags = new TwitterApiGarden.Hashtags();
    TwitterApiGarden.Trends = new TwitterApiGarden.Trends();

    // views
    var hashtagsView = new TwitterApiGarden.HashtagsView({
      collection: TwitterApiGarden.Hashtags,
      el: '#hashtags'
    });
    var trendsView = new TwitterApiGarden.TrendsView({
      collection: TwitterApiGarden.Trends,
      el: '#trends'
    });
    var hashtagForm = new TwitterApiGarden.HashtagFormView({ el: 'form' });

    // start!
    this.start();
  },
  start: function () {
    TwitterApiGarden.Trends.fetch({ reset: true });
  }
};