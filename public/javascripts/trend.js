TwitterApiGarden.Trend = Backbone.Model.extend({
});

TwitterApiGarden.Trends = Backbone.Collection.extend({
  model: TwitterApiGarden.Trend,
  url: '/trends'
});

TwitterApiGarden.TrendView = Backbone.View.extend({
  tagName: 'h6',
  render: function () {
    var source = $("#trend-template").html();
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON());
    $(this.el).html(html);
    return this;
  }
});

TwitterApiGarden.TrendsView = Backbone.View.extend({
  initialize: function () {
    this.collection.bind('replace reset add remove', this.render, this);
  },
  render: function () {
    var $trends = $(this.el);
    this.collection.each(function (m) {
      var trendView = new TwitterApiGarden.TrendView({ model: m });
      $trends.append(trendView.render().el);
    });
    return this;
  }
});