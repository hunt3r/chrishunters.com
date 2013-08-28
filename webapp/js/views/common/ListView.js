define(['jquery',
        'underscore',
        'backbone',
        'nprogress',
        'utils',
        'text!templates/common/list.tpl.html',
        'models/ContentCollection',
        'models/ContentItem'], 
        function($, _, Backbone, NProgress, Utils, template, ContentCollection, ContentItem){


    var ListView = Backbone.View.extend({
        el: $("#page"),
        collection: null,
        progressBar: NProgress,
        query: new Parse.Query(ContentItem),
        initialize: function(options) {
            var self = this;
            NProgress.start();
            this.options = options;

            if(_.has(options, "query")) {
                this.query = options.query;
            }

            this.query.descending("created");

            this.query.find({
                success: function(results) {
                    self.collection = results;
                    self.render();
                }, 
                error: function(error) {
                    log(error);
                }
            });
        },
        render: function(){

            var compiledTemplate = _.template( template, {"pageTitle": this.options.title || "",
                                                            "items": this.collection});
            
            if(_.has(this.options, "title"))
                Utils.setTitle(this.options.title);

            this.$el.html(compiledTemplate);
            NProgress.done();
        }

    });

    return ListView;
        
});