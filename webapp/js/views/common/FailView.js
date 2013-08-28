define([
  'jquery',
  'nprogress',
  'underscore',
  'backbone',
  'text!templates/common/404.tpl.html'
], function($, NProgress, _, Backbone, failTemplate){

  var DetailView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(options) {
      NProgress.start();

      if(_.has(options, "status"))
        this.status = options["status"];

      this.render();
    },
    render: function(){
      var compiledTemplate = _.template(failTemplate, {status: this.status});
      this.$el.html(compiledTemplate);
      NProgress.done();
    }

  });

  return DetailView;
  
});