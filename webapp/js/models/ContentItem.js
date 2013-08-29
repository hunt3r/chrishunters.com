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
      //This is an attempt to take the first x characters from the HTML without breaking the markup, it will allow for some 
      //bleed over if the first paragraph is too big, so you don't end up with 0 length summary
      summary : function(limit) {
        //used as a parent container
        var $container = $("<div/>", { class : "summary"});
        var html = this.get("html");
        var $html = $(html.replace(/\n/g,""));
        $container.append($html);
        var $content = $container.find("p");
        var summary = "";
        var currentSize = 0;

        $.each($content, function(i, p) {
          if(currentSize + p.outerHTML.length < limit) {
            summary += p.outerHTML;
            currentSize += p.outerHTML.length
          }
          if(currentSize == 0 && p.outerHTML.length > limit) {
            p.innerHTML = p.innerHTML.substring(0, limit) + "...";
            summary = p.outerHTML;
          }
        });

        return summary;
      }
    });  

	return ContentItem;

});