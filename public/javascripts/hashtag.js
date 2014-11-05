TwitterApiGarden.Hashtag = Backbone.Model.extend({
    
});

TwitterApiGarden.Hashtags = Backbone.Collection.extend({
  model: TwitterApiGarden.Hashtag,
  q: '',
  search: function (q) {
    this.q = q;
    this.fetch({reset: true});
  },
  url : function() {
    return '/hashtag/' + this.q;
  }
});

TwitterApiGarden.HashtagFormView = Backbone.View.extend({
  initialize: function () {

  },
  events: {
    'submit': 'search'
  },
  search: function (e) {
    e.preventDefault();
    var q = this.$el.find('input').val();
    TwitterApiGarden.Hashtags.search(q);
  }
});

TwitterApiGarden.HashtagView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  render: function () {
    var t = $('#hashtag-template').html();
    var template = _.template(t);
    var html = template(this.model.toJSON());
    $(this.el).html(html);
    return this;
  }
});

TwitterApiGarden.HashtagsView = Backbone.View.extend({
  initialize: function () {
    this.collection.bind('reset', this.render, this);
  },
  render: function () {
    var $hashtags = [];
    this.collection.models[0].attributes.hashtags.each(function (h) {
      var v = new TwitterApiGarden.HashtagView({ model: h });
      $hashtags.push(v.render().el);
    });

    $(this.el).html($hashtags);
    return this;
  }
});