// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'utils',
    'models/ContentItem',
    'views/common/DetailView',
    'views/common/ListView',
    'views/common/FailView',
    
], function($, _, Backbone, Utils, ContentItem, DetailView, ListView, FailView) {

    var AppRouter = Backbone.Router.extend({
        
        routes: {
            // Define some URL routes
            'projects': 'Projects',
            'thoughts': 'Thoughts',
            'archives': 'Archives',
            'item/:slug': 'Item',
            'tag/:tag': 'Tag',
            'home': 'Home',
            '': 'Home',
            '': 'Home',
            
            // Default
            '*actions': '404'
        }
    });
    
    $(document).on("click", "a[href^='/']", function(event) {
        var href = $(event.currentTarget).attr('href');

        //chain 'or's for other black list routes
        var passThrough = (href.indexOf('/api') >= 0) ? true : false;

        // Allow shift+click for new tabs, etc.
        if(passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
        }
        //Remove leading slashes and hash bangs (backward compatablility)
        var url = href.replace(/^\//,'').replace('\#','');

        //Instruct Backbone to trigger routing events
        AppRouter.navigate(url, { trigger: true });

        return false;
    });

    var initialize = function(){

        var router = new AppRouter;

        /**
         * Global event for route change
         */
        router.on("route",function(route, router) {
            log("Route:: ", route);
            
        });

        /**
         * Projects Page
         */
        router.on('route:Projects', function(){
     
                var query = new Parse.Query(ContentItem);
                query.equalTo("type", "project");
                var view = new ListView({"title": "My Projects", "query": query});

        });
        

        /**
         * By Tag
         */
        router.on('route:Tag', function(tag){
            var query = new Parse.Query(ContentItem);
            query.containedIn("tag", [tag]);
            var view = new ListView({"title": tag, "query": query});
        });

        /**
         * My thoughts blog
         */
        router.on('route:Thoughts', function(){
            var query = new Parse.Query(ContentItem);
            query.equalTo("type", "thought");
            var view = new ListView({"title": "Some Thoughts", "query": query});
        });
        
        /**
         * Archives Page
         */
        router.on('route:Archives', function(){
     
                var query = new Parse.Query(ContentItem);
                query.equalTo("type", "item");
                var view = new ListView({"title": "Archives", "query": query});

        });
        

        /**
         * Item detail view
         */
        router.on('route:Item', function(slug){
            var view = new DetailView({"slug": slug});
        });


        /**
         * Homepage
         */
        router.on('route:Home', function (actions) {
            // We have no matching route, lets display the home page 
            var query = new Parse.Query(ContentItem);
            query.equalTo("homepage", true);
            var view = new ListView({"query": query});
        });

        /**
         * 404 page
         */
        router.on('route:404', function (actions) {
            
            var view = new FailView({"status": 404});
        });

        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        // var footerView = new FooterView();

        Backbone.history.start({pushState: true});
    };
    return { 
        initialize: initialize
    };
});