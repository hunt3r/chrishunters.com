type: project
title: Some imagacache presets
created: 2010-01-17 12:58:21 -05:00
categories: 
tag:Imagecache
tag:Drupal
tag:MySQL
<p>I use the following SQL to get some quick presets up and rolling.&nbsp; I know this can be cleaner, but it works for many smaller sites I do.&nbsp; Just dump this into an SQL statement in Phpmyadmin or from the command line.</p><p>{% codeblock %}SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
--

-tag:--------------------------------------------------------

--
-tag:Table structure for TABLE `default_imagecache_action`
--

DROP TABLE IF EXISTS `default_imagecache_action`;
CREATE TABLE IF NOT EXISTS `default_imagecache_action` (
  `actionid` int(10) unsigned NOT NULL auto_increment,
  `presetid` int(10) unsigned NOT NULL default '0',
  `weight` int(11) NOT NULL default '0',
  `module` varchar(255) NOT NULL default '',
  `action` varchar(255) NOT NULL default '',
  `data` longtext NOT NULL,
  PRIMARY KEY  (`actionid`),
  KEY `presetid` (`presetid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-tag:Dumping data for TABLE `default_imagecache_action`
--

INSERT INTO `default_imagecache_action` (`actionid`, `presetid`, `weight`, `module`, `action`, `data`) VALUES
(2, 2, 0, 'imagecache', 'imagecache_scale_and_crop', 'a:2:{s:5:"width";s:3:"450";s:6:"height";s:3:"450";}'),
(3, 3, 0, 'imagecache', 'imagecache_scale_and_crop', 'a:2:{s:5:"width";s:3:"100";s:6:"height";s:3:"100";}'),
(4, 4, 0, 'imagecache', 'imagecache_scale', 'a:3:{s:5:"width";s:3:"200";s:6:"height";s:0:"";s:7:"upscale";i:0;}'),
(8, 1, 0, 'imagecache', 'imagecache_scale', 'a:3:{s:5:"width";s:3:"725";s:6:"height";s:3:"725";s:7:"upscale";i:0;}'),
(6, 5, 0, 'imagecache', 'imagecache_scale_and_crop', 'a:3:{s:5:"width";i:60;s:6:"height";i:60;s:7:"upscale";i:1;}'),
(7, 6, 0, 'imagecache', 'imagecache_scale_and_crop', 'a:2:{s:5:"width";s:2:"50";s:6:"height";s:2:"50";}'),
(9, 7, -9, 'imagecache_canvasactions', 'canvasactions_roundedcorners', 'a:3:{s:6:"radius";s:1:"2";s:23:"independent_corners_set";a:2:{s:19:"independent_corners";i:0;s:5:"radii";a:4:{s:2:"tl";s:0:"";s:2:"tr";s:0:"";s:2:"bl";s:0:"";s:2:"br";s:0:"";}}s:9:"antialias";i:0;}'),
(10, 7, -10, 'imagecache', 'imagecache_scale_and_crop', 'a:2:{s:5:"width";s:2:"15";s:6:"height";s:2:"15";}'),
(11, 8, 0, 'imagecache', 'imagecache_scale', 'a:3:{s:5:"width";s:0:"";s:6:"height";s:2:"25";s:7:"upscale";i:0;}'),
(14, 8, 0, 'imagecache', 'imagecache_desaturate', 'a:0:{}'),
(15, 9, 0, 'imagecache', 'imagecache_scale_and_crop', 'a:2:{s:5:"width";s:3:"250";s:6:"height";s:3:"145";}'),
(16, 9, 0, 'imagecache_canvasactions', 'canvasactions_roundedcorners', 'a:3:{s:6:"radius";s:2:"12";s:23:"independent_corners_set";a:2:{s:19:"independent_corners";i:0;s:5:"radii";a:4:{s:2:"tl";s:0:"";s:2:"tr";s:0:"";s:2:"bl";s:0:"";s:2:"br";s:0:"";}}s:9:"antialias";b:1;}');

-tag:--------------------------------------------------------

--
-tag:Table structure for TABLE `default_imagecache_preset`
--

DROP TABLE IF EXISTS `default_imagecache_preset`;
CREATE TABLE IF NOT EXISTS `default_imagecache_preset` (
  `presetid` int(10) unsigned NOT NULL auto_increment,
  `presetname` varchar(255) NOT NULL default '',
  PRIMARY KEY  (`presetid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-tag:Dumping data for TABLE `default_imagecache_preset`
--

INSERT INTO `default_imagecache_preset` (`presetid`, `presetname`) VALUES
(1, 'Full_Size'),
(2, 'Preview'),
(3, 'Thumbnail'),
(4, 'taxonomy-category'),
(5, 'AttachmentThumbnail'),
(6, 'thumbnail-small'),
(7, 'bullet_15x15'),
(8, 'taxo-image_Xx25'),
(9, 'homepage_stickyXx140');
{% endcodeblock %}</p>
