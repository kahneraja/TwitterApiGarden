TwitterApiGarden.Hashtag = Backbone.Model.extend({
    
});

TwitterApiGarden.Hashtags = Backbone.Collection.extend({
  model: TwitterApiGarden.Hashtag,
  q: '',
  search: function (q) {
    this.q = q;
    this.reset();
    $('#loading').removeClass('hidden');
    this.fetch({ reset: true });
  },
  url: function () {
    return '/hashtag/' + this.q;
  }
});

TwitterApiGarden.HashtagFormView = Backbone.View.extend({
  initialize: function () {
    var path = window.location.pathname.split('/').pop();
    if (path) {
      this.$el.find('input').val(path);
    }
  },
  events: {
    'submit': 'search'
  },
  search: function (e) {
    if (e)
      e.preventDefault();

    var q = this.$el.find('input').val();
    window.location.href = q;
  }
});

TwitterApiGarden.HashtagsView = Backbone.View.extend({
  initialize: function () {
    this.collection.bind('replace reset add remove', this.render, this);
  },
  render: function () {
    $(this.el).html();
    $('#loading').addClass('hidden');
    var report = _.first(this.collection.models);
    var source = $("#report-template").html();
    var template = Handlebars.compile(source);
    var html = template(report);
    $(this.el).html(html);
    return this;
  }
});