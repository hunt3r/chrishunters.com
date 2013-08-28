define([
  'jquery',
  'underscore',
  'backbone',
  'timeago'
], function($, _, Backbone, Timeago) {

    var ContentItem = Parse.Object.extend({
    	className: "ContentItem",
    	timeago : function() {
    		return $.timeago(this.get("created"));
    	},
      summary : function(limit) {
        var html = this.get("html");
        var $html = $(html);
        var summary = "";
        var currentSize = 0;

        $.each($html, function(i, tag) {
          if(tag.outerHTML && currentSize + tag.outerHTML.length < limit) {
            summary += tag.outerHTML;
            currentSize += tag.outerHTML.length
            log(summary);
          }
        });

        return summary;
      }
    });  

	return ContentItem;

});