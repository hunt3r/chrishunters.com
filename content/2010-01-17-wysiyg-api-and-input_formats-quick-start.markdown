type: project
title: Wysiyg API and Input_formats quick start
created: 2010-01-17 13:15:44 -05:00
categories: 
tag:Drupal
tag:MySQL
<p>{% codeblock %}-tag:phpMyAdmin SQL Dump

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-tag:Database: `chrihu3_port112209`
--

-tag:--------------------------------------------------------

--
-tag:Table structure for TABLE `default_filters`
--

DROP TABLE IF EXISTS `default_filters`;
CREATE TABLE IF NOT EXISTS `default_filters` (
  `fid` int(11) NOT NULL auto_increment,
  `format` int(11) NOT NULL default '0',
  `module` varchar(64) NOT NULL default '',
  `delta` tinyint(4) NOT NULL default '0',
  `weight` tinyint(4) NOT NULL default '0',
  PRIMARY KEY  (`fid`),
  UNIQUE KEY `fmd` (`format`,`module`,`delta`),
  KEY `list` (`format`,`weight`,`module`,`delta`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=139 ;

--
-tag:Dumping data for TABLE `default_filters`
--

INSERT INTO `default_filters` (`fid`, `format`, `module`, `delta`, `weight`) VALUES
(133, 1, 'filter', 2, 0),
(43, 3, 'php', 0, 0),
(132, 1, 'syntaxhighlighter', 0, 10),
(134, 5, 'lightbox2', 0, 10),
(135, 5, 'lightbox2', 5, 10),
(136, 5, 'lightbox2', 4, 10),
(137, 5, 'syntaxhighlighter', 0, 10),
(138, 5, 'filter', 2, 0);

-tag:--------------------------------------------------------

--
-tag:Table structure for TABLE `default_filter_formats`
--

DROP TABLE IF EXISTS `default_filter_formats`;
CREATE TABLE IF NOT EXISTS `default_filter_formats` (
  `format` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL default '',
  `roles` varchar(255) NOT NULL default '',
  `cache` tinyint(4) NOT NULL default '0',
  PRIMARY KEY  (`format`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-tag:Dumping data for TABLE `default_filter_formats`
--

INSERT INTO `default_filter_formats` (`format`, `name`, `roles`, `cache`) VALUES
(1, 'Filtered HTML', ',1,2,3,', 1),
(3, 'PHP code', '', 0),
(5, 'Admin Filter', ',3,', 1);

-tag:--------------------------------------------------------

--
-tag:Table structure for TABLE `default_wysiwyg`
--

DROP TABLE IF EXISTS `default_wysiwyg`;
CREATE TABLE IF NOT EXISTS `default_wysiwyg` (
  `format` int(11) NOT NULL default '0',
  `editor` varchar(128) NOT NULL default '',
  `settings` text,
  PRIMARY KEY  (`format`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-tag:Dumping data for TABLE `default_wysiwyg`
--

INSERT INTO `default_wysiwyg` (`format`, `editor`, `settings`) VALUES
(2, 'openwysiwyg', NULL),
(3, '', NULL),
(1, 'tinymce', 'a:21:{s:7:"default";i:1;s:11:"user_choose";i:0;s:11:"show_toggle";i:0;s:5:"theme";s:8:"advanced";s:8:"language";s:2:"en";s:7:"buttons";a:8:{s:7:"default";a:17:{s:4:"bold";i:1;s:6:"italic";i:1;s:9:"underline";i:1;s:13:"strikethrough";i:1;s:13:"justifycenter";i:1;s:12:"justifyright";i:1;s:11:"justifyfull";i:1;s:7:"bullist";i:1;s:7:"numlist";i:1;s:7:"outdent";i:1;s:6:"indent";i:1;s:4:"link";i:1;s:6:"unlink";i:1;s:6:"anchor";i:1;s:3:"sup";i:1;s:3:"sub";i:1;s:10:"blockquote";i:1;}s:11:"contextmenu";a:1:{s:11:"contextmenu";i:1;}s:4:"font";a:2:{s:12:"formatselect";i:1;s:14:"fontsizeselect";i:1;}s:12:"inlinepopups";a:1:{s:12:"inlinepopups";i:1;}s:5:"paste";a:1:{s:9:"pasteword";i:1;}s:10:"xhtmlxtras";a:1:{s:4:"cite";i:1;}s:13:"preelementfix";a:1:{s:13:"preelementfix";i:1;}s:8:"syntaxhl";a:1:{s:8:"syntaxhl";i:1;}}s:11:"toolbar_loc";s:3:"top";s:13:"toolbar_align";s:4:"left";s:8:"path_loc";s:6:"bottom";s:8:"resizing";i:1;s:11:"verify_html";i:1;s:12:"preformatted";i:0;s:22:"convert_fonts_to_spans";i:1;s:17:"remove_linebreaks";i:0;s:23:"apply_source_formatting";i:0;s:27:"paste_auto_cleanup_on_paste";i:1;s:13:"block_formats";s:57:"p,h1,h2,h3,h4,h5,h6,div,blockquote,address,pre,code,dt,dd";s:11:"css_setting";s:4:"self";s:8:"css_path";s:15:"%b%t/styles.css";s:11:"css_classes";s:0:"";s:13:"form_build_id";s:37:"form-ca15f9cfca54eda0bd06a315162331cb";}'),
(5, 'tinymce', 'a:21:{s:7:"default";i:1;s:11:"user_choose";i:0;s:11:"show_toggle";i:1;s:5:"theme";s:8:"advanced";s:8:"language";s:2:"en";s:7:"buttons";a:11:{s:7:"default";a:22:{s:4:"bold";i:1;s:6:"italic";i:1;s:9:"underline";i:1;s:13:"strikethrough";i:1;s:11:"justifyleft";i:1;s:13:"justifycenter";i:1;s:12:"justifyright";i:1;s:11:"justifyfull";i:1;s:7:"bullist";i:1;s:7:"numlist";i:1;s:7:"outdent";i:1;s:6:"indent";i:1;s:4:"link";i:1;s:6:"unlink";i:1;s:6:"anchor";i:1;s:5:"image";i:1;s:7:"cleanup";i:1;s:9:"forecolor";i:1;s:9:"backcolor";i:1;s:3:"sup";i:1;s:3:"sub";i:1;s:10:"blockquote";i:1;}s:8:"advimage";a:1:{s:8:"advimage";i:1;}s:7:"advlink";a:1:{s:7:"advlink";i:1;}s:4:"font";a:1:{s:12:"formatselect";i:1;}s:5:"paste";a:1:{s:9:"pasteword";i:1;}s:7:"preview";a:1:{s:7:"preview";i:1;}s:5:"table";a:1:{s:13:"tablecontrols";i:1;}s:5:"media";a:1:{s:5:"media";i:1;}s:10:"xhtmlxtras";a:1:{s:4:"cite";i:1;}s:13:"preelementfix";a:1:{s:13:"preelementfix";i:1;}s:8:"syntaxhl";a:1:{s:8:"syntaxhl";i:1;}}s:11:"toolbar_loc";s:3:"top";s:13:"toolbar_align";s:4:"left";s:8:"path_loc";s:6:"bottom";s:8:"resizing";i:1;s:11:"verify_html";i:1;s:12:"preformatted";i:0;s:22:"convert_fonts_to_spans";i:1;s:17:"remove_linebreaks";i:0;s:23:"apply_source_formatting";i:0;s:27:"paste_auto_cleanup_on_paste";i:0;s:13:"block_formats";s:40:"p,address,pre,h2,h3,h4,h5,h6,div,sub,sup";s:11:"css_setting";s:5:"theme";s:8:"css_path";s:0:"";s:11:"css_classes";s:20:"Has Tool Tip=has-tip";s:13:"form_build_id";s:37:"form-c7166f9c066992c6303a5ad5887f0655";}'),
(4, 'tinymce', 'a:21:{s:7:"default";i:1;s:11:"user_choose";i:0;s:11:"show_toggle";i:0;s:5:"theme";s:8:"advanced";s:8:"language";s:2:"en";s:7:"buttons";a:2:{s:7:"default";a:9:{s:4:"bold";i:1;s:6:"italic";i:1;s:9:"underline";i:1;s:13:"strikethrough";i:1;s:4:"link";i:1;s:6:"unlink";i:1;s:7:"cleanup";i:1;s:3:"sup";i:1;s:3:"sub";i:1;}s:4:"font";a:1:{s:12:"formatselect";i:1;}}s:11:"toolbar_loc";s:3:"top";s:13:"toolbar_align";s:4:"left";s:8:"path_loc";s:6:"bottom";s:8:"resizing";i:1;s:11:"verify_html";i:1;s:12:"preformatted";i:0;s:22:"convert_fonts_to_spans";i:1;s:17:"remove_linebreaks";i:1;s:23:"apply_source_formatting";i:0;s:27:"paste_auto_cleanup_on_paste";i:1;s:13:"block_formats";s:40:"p,address,pre,h2,h3,h4,h5,h6,div,sup,sub";s:11:"css_setting";s:5:"theme";s:8:"css_path";s:0:"";s:11:"css_classes";s:0:"";s:13:"form_build_id";s:37:"form-b9f7f41753d003c52d9f25e543da08d7";}');
{% endcodeblock %}</p>
