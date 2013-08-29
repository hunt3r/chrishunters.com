type: project
title: Taxonomy data as term view header
created: 2009-12-22 12:16:12 -05:00
categories: 
tag:Web Development
tag:Programming
tag:PHP
tag:MySQL
tag:Drupal
<p>If you would like to create a page view that takes a term id as an argument (like my technology, portfolio pages), You can use the following code in the header of the Views 2 Taxonomy Term view.</p><p>{% codeblock %}&lt;?php
 
  $view = views_get_current_view();
  // [0] is first arg, [1] is second etc.
  $term_arg = $view-&gt; args[0];
  //get the taxonomy object
  $t = taxonomy_get_term($term_arg);
  //get the taxonomy term image  
  $timg = taxonomy_image_display($term_arg, null, "taxonomy-category");
  echo("&lt;div class='taxo-image-outer'&gt;&lt;div class='taxo-image-inner'&gt;".  
             $timg . 
          "&lt;/div&gt;&lt;p&gt;". $t-&gt;description.
                                   "&lt;/p&gt;&lt;/div&gt;&lt;div class='clear-block'&gt;&amp;nbsp;&lt;/div&gt;");

?&gt;{% endcodeblock %}</p><p>I realize the formatting of this code is not ideal, but you get the idea.</p> 
 The logic flows like:</p><ol><li>Get the $view object</li><li>Create a static int var of the first term argument</li><li>Get the full taxonomy term object</li><li>Get the taxonomy_image object and imagecache preset from the<a href="http://drupal.org/node/220844" target="_blank"> taxonomy_image_display()</a> call</li><li>Finally I just call an echo command and style it a little bit.</li></ol>
