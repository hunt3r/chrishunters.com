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
        var $html = $(html).find("p");
        var summary = "";
        var currentSize = 0;
        
        $.each($html, function(i, tag) {
          if(currentSize + tag.outerHTML.length < limit) {
            summary += tag.outerHTML;
            currentSize += tag.outerHTML.length
          }
          if(currentSize == 0 && tag.outerHTML.length > limit) {
            tag.innerHTML = tag.innerHTML.substring(0, limit);
            summary = tag.outerHTML;
          }
        });

        return summary;
      }
    });  

	return ContentItem;

});