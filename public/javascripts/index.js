TwitterApiGarden = {
  init: function () {

    // data
    TwitterApiGarden.Hashtags = new TwitterApiGarden.Hashtags();

    // view
    var hashtagsView = new TwitterApiGarden.HashtagsView({
      collection: TwitterApiGarden.Hashtags,
      el: '#hashtags'
    });

    var hashtagForm = new TwitterApiGarden.HashtagFormView({ el: 'form' });
  }
};