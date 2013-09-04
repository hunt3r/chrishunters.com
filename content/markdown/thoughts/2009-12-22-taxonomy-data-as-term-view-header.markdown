type: project
title: Taxonomy data as term view header
created: 2009-12-22 12:16:12 -05:00
categories: 
tag:Web Development
tag:Programming
tag:PHP
tag:MySQL
tag:Drupal

If you would like to create a page view that takes a term id as an argument (like my technology, portfolio pages), You can use the following code in the header of the Views 2 Taxonomy Term view.

    <?php
      $view = views_get_current_view();
      // [0] is first arg, [1] is second etc.
      $term_arg = $view-> args[0];
      //get the taxonomy object
      $t = taxonomy_get_term($term_arg);
      //get the taxonomy term image  
      $timg = taxonomy_image_display($term_arg, null, "taxonomy-category");
      echo("<div class='taxo-image-outer'><div class='taxo-image-inner'>".  
                 $timg . 
              "<div>". $t->description . "<p><div><div class='clear-block'><div>");
      ?>
 


I realize the formatting of this code is not ideal, but you get the idea.
 The logic flows like:
* Get the $view object
* Create a static int var of the first term argument
* Get the full taxonomy term object
* Get the taxonomy_image object and imagecache preset from the taxonomy_image_display() call
* Finally I just call an echo command and style it a little bit.
