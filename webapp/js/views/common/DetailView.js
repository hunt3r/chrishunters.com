define([
  'jquery',
  'nprogress',
  'underscore',
  'backbone',
  'utils',
  'models/ContentItem',
  'text!templates/common/detail.tpl.html',
  'text!templates/common/404.tpl.html'
], function($, NProgress, _, Backbone, Utils, ContentItem, template, failTemplate){

  var DetailView = Backbone.View.extend({
    el: $("#page"),
    query: new Parse.Query(ContentItem),
    failView: function() {
      var compiledTemplate = _.template(failTemplate);
      this.$el.html(compiledTemplate);
      NProgress.done();
    },
    initialize: function(options) {
      NProgress.start();
      var self = this;
      this.slug = options.slug;

      log("Loading item by slug", this.slug);

      this.query.equalTo("slug", this.slug);
      this.query.find({
        success: function(collection) {
          if(collection.length > 0)
            self.model = collection[0];
          else
            self.failView();

          self.render();
        },
        error: function(object, error) {
          NProgress.done();
        }
      });
    },
    render: function(){
      var self = this;
      Utils.setTitle(self.model.get("title"));
      var compiledTemplate = _.template(template, {"item": self.model });
      this.$el.html(compiledTemplate);
      NProgress.done();
    }

  });

  return DetailView;
  
});