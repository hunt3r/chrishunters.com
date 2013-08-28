--tag:
layout: post
title: "Migrate from SMF Forum to Drupal "
created: 2010-02-14 19:48:40 -05:00
categories: 
tag:Web Development
tag:Programming
tag:MySQL
tag:PHP
tag:Apache
tag:Drupal
tag:SMF
tag:SImple Machines Forum
tag:phpBB3
tag:phpBB2Drupal
tag:jFusion
tag:Drupal 6
---
<p>Recently I needed to do a migration
from the Simple Machines Forum (SMF) to the Drupal Native Forum.  I
think most people by this point have heard of Drupal, and if you're
reading this, chances are you're in a similar situation.  If you want
to migrate from SMF to Drupal, there is no direct route beyond
writing your own Migration software from scratch in PHP.  In this
project I'm migrating from a Bridged Joomla and SMF site that has
roughly 16,000 posts and about 1100 users. </p><p><em><span style="text-decoration: underline;">Note: I do not support this mechanism, if you mess up your site, you are on your own. &nbsp;You should always back up often and have a way to get back to where you were before you started.</span></em></p><p><strong>The setup of the old site
is as follows:</strong></p>
<p>&nbsp;</p><ul><li>Joomla 1.5.x</li><li>JACL Pro</li><li>Jfusion</li><li>SMF Forum 1.1.x</li><li>Community Builder 1.2.x</li><li>AEC</li></ul><p>&nbsp;</p><p>
Migrating to -</p><ul><li>Drupal 6.x</li><li>Advanced Forum</li><li>Author Panel</li><li>CiviCRM</li><li>Node Comment</li><li>CCK</li><li>Views</li></ul><p>&nbsp;</p>








<p>&nbsp;</p>
<h3>Pre migration server setup:</h3>
<p>&nbsp;</p><ul><li>Create a MySQL dump of both your
existing Joomla/SMF site and the Drupal Install.</li><li>In the Drupal site edit the .htaccess
file and add these lines, to ensure that php scripts don't mass out
memory</li><li>php_value memory_limit 256M</li><li>php_value max_execution_time 2000</li></ul><p>&nbsp;</p>



<p>&nbsp;</p>
<h4>Optional: Migrate Joomla</h4>
<p>To migrate Joomla, I used a module called
Joomla2Drupal</p>
<p><a href="http://drupal.org/project/joomla">http://drupal.org/project/joomla</a></p>
<p>I made some customizations to join
Community Builders fields onto the user import.  If anyone is
interested in this code I'll post it, just comment on this post. 
It's not really contribution worthy, but it might help someone get
started.  If you don't use Community Builder, this is probably a win
out of the box. &nbsp;The phpBB2Drupal import seems to be ok with existing users in the database if you do a Joomla import first.</p>
<h3>SMF</h3>
<p>To Migrate SMF it gets a bit more
tricky.  I couldn't find a direct SMF to Drupal type module.  I
briefly considered extending the Joomla2Drupal module, but after
looking at the SMF tables, it would have taken way too much time
(considering I'm paid nothing for this work).  What made the most
sense to use the <a href="http://www.phpbb.com/community/viewtopic.php?f=65&amp;t=1641375">phpBB3
converter </a>then use the <a href="http://drupal.org/project/phpbb2drupal">phpBB2Drupal
migration tool</a>.</p>
<h3>Install phpBB3</h3>
<p>First download the <a href="http://www.ohloh.net/p/phpbb/download?filename=phpBB-3.0.6.zip">phpBB3</a>
and the phpBB3 converter from the link in the paragraph above.  Unzip
the phpBB3 install folder.  Then unzip the contents of the zip file
you download into  your base phpBB3 folder, it will have files that
need to go into the includes and the install folders for the
converter.</p>
<p>Now what I did was to put the phpBB3
install folder inside the Joomla folder, run the installer,
&lt;yourdomain.com&gt;/phpBB3_folder/install/ and instead of
installing it in the Joomla Database, I used the new Drupal sites
database.  <strong>BACKUP YOUR DRUPAL DATABASE.  </strong>Run the installer,
setup a new phpBB3 forum using the standard table prefix.  Once this
is complete click the Converter tab.  Select phpBB3 converter.  Enter
your older forums location relative to the new forum, usually
something like ../smf_forum (or whatever your smf folder is).  Setup
the database connection for your old joomla/SMF database, I used a
root level username to do this, so that it was easier to manage the
credentials between migration steps.  It doesn't need to be though,
it just needs to be a user that has access to that database, the user
your SMF site currently uses will work fine.  Ensure that your
webservers user (www-data, daemon, et al) has ownership of the files
in the directory.  Using SSH you can run: chown -R www-data.www-data
. (if you're currently in the site root (this will cascade ownership
into all your site folders so that the migration can copy attachments
if needed).</p>
<p>Run the migration.  If all goes well,
delete the phpbb3/install folder and check out your new site.  If it
worked you should have a fully migrated phpBB3 site.  You actually
have the option at this stage of running a bridged phpBB3 Drupal
site, where Drupal just syncronizes sessions<a href="http://drupal.org/project/phpbbforum">
using the phpbb3 module </a> I don't recommend this.  Now you need to
prepare your Drupal site to be migrated to.</p>
<h3>Setting up Drupal</h3>
<p>Download and install <a href="http://drupal.org/project/phpbb2drupal">phpBB2Drupal</a>.
 Install Advanced Forum, Author Pane, Post Statistics, comment
attach, Phpass, Bbcode modules.  Configure a migration with the
phpBb2Drupal module, continue to save your configuration until it
allows you to continue.  It does numerous checks until it finds all
the right settings.  You will need to read the directions on the
configuration screen.</p>
<p><strong>BACKUP YOUR DRUPAL DATABASE!!! </strong>
I can't say it enough, also use a unique name each time.  It's nice
to be able to go back to a specific time as you move forward.  It's
important to have a snapshot of your database before each big move
you make.  Cleaning up a database after a failed migration can take
time and energy that is best spent on moving forward with other
challenging design features.</p>
<p>You may want to roll your database back
to before you ran the first phpBB3 installer, since you likely have
many other things you'd like to work on, and your live forum is
possibly still online.  Your migrated data will become stale quite
quickly.  Once you know your migration method works, migrating again
shouldn't be so mysterious.  Roll back, finish up your site, and run
the migration at the very end just before you switch over.</p><p>&nbsp;</p>
