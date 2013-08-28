type: project
title: Backing up w/ Drush
created: 2009-12-29 00:07:19 -05:00
categories: 
tag:Web Development
tag:Programming
tag:MySQL
tag:Linux
tag:Drupal
tag:Drush
<p><a href="http://drupal.org/project/drush" target="_blank">Drush,</a> my favorite new tool, is proving to be quite useful.&nbsp; Drush saves you time by picking up your connection string from the sites settings.php folder that you're backing up, you no longer need to configure each backup script individually.&nbsp; </p><p>sample usage for this script would be:</p><p>bash backup.sh /full/path/to/drupal/site &lt;optional&gt; archive_prefix &lt;optional&gt; #of days to keep archives for</p><p>That's it!&nbsp; You do need to configure the script to your servers paths for where you want the backups to be stored, and where drush is located.</p><p>Here's the command I'm calling for my cron jobs</p><p>bash /home/user/workspace/utils/backup.sh /home/user/www/site site_name 4</p><p>&nbsp;</p><p>{% codeblock %}#!/bin/bash
# 
# Copyright (c) 2009 Chrishunters.com
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.&nbsp; See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.&nbsp; If not, see &lt;http://www.gnu.org/licenses/&gt;.
#
# ---------------------------------------------------------------------
#
# Version 1 tag:Dec 31 2009
# Drupal backup w/Drush
#
# This script was designed to backup a drupal sites files and database into 
# one gz archive.&nbsp; This can be run as a cron script. &nbsp;
# Sample usage: 
# bash /home/user/workspace/utils/backup.sh /home/user/www/site site_name 4
#
# pos 1: the full path to the drupal site you're backing up
# pos 2: optional name of site
# pos 3: optional override for number of days to keep old backup archives, 


#!/bin/bash
## Drush based drupal backup script

#Global Vars
basepath="/home/user" #no trailing slash here
scriptdirectory="$basepath/workspace/utils"
backupdir="$basepath/workspace/utils/backups"
drushpath="/var/drush" #no trailing slash here 

#App vars
drushsuccess="Successful"
sitename=""
days_to_keep=7

############
# Utility function to run a script and search for a particular string
# Return 0 for false, 1 for true
####### # #
bln_runAndReadOutput () {  
  script_contents=( $($1) ) 
  for element in $(seq 0 $((${#script_contents[@]} tag:1)))
    do              
    	if [ "${script_contents[$element]}" = $2 ]; then
	   		#if we find the string we want, return 1
			return 1
    	fi
  done
  #if not, return 0
  return 0
}

#make sure we've got an argument for the drupal site path
if [ $1 ]; then
 echo "Checking $1" 
else
 echo "Usage: backup.sh path/to/drupal/site &lt;optional&gt; name_of_archive &lt;optional&gt; #of days to keep old log files for"
 exit
fi

#see if the directory exists                                                                                                                                  
if [  -d "$1"  ]; then
  echo "$1 is a directory, checking drupal now"
  #run and capture output into variable
  bln_runAndReadOutput "bash $drushpath/drush -r $1 st" "$drushsuccess"
  result=$?
  if [ $result -eq 1 ]; then
    echo "Found drupal site. Success."
	else
	echo "Drush could not find the site. exiting."
	exit
	fi
else
  echo "Please add an argument of the drupal install path, ie: backup ~/www/pbj"
  exit;
fi

if [ $2 ]; then
  sitename="$2"
  echo "Name was supplied as argument $2"
else #no name was specified, use the drupal site folder name

#vars
  declare -a site
  site=( `echo $1 | tr -s '/' ' '` )
  declare -i arr_length=${#site[@]} 
  sitename=${site[$arr_length-1]}
fi

#if we want to keep more or less backups for this site, 
#we can use the 3rd parameter to do so
if [ $3 ]; then
  days_to_keep=$3
  echo "Now keeping $3 days of logs"
fi

#tempdir is a combination of the scriptsdir and the current sitename
tempdir="$scriptdirectory/backup_$sitename"

#see if the site argument exists, then check to see if backup sub directory exists                                                                      
if [ -d $backupdir ]; then
 echo "backup directory found. [ $backupdir ]"
else
  echo "backup directory not found, creating now... [ $backupdir ]"
  mkdir $backupdir
fi

echo "Backing up $sitename"
if [ -d "$backupdir/$sitename" ]; then
 echo "Backup subdir found."
else
 echo "Creating $backupdir/$sitename" 
 mkdir $backupdir/$sitename
fi

mkdir $tempdir

#Use drush to get the database
$drushpath/drush -r $1 sql dump &gt; $tempdir/data.sql

#tar/gz the files from the arg 1
echo "running: tar -pczf $tempdir/files.tgz $1"
tar -pczf $tempdir/files.tgz $1

echo "running: tar -pczf $backupdir/$sitename/$sitename_backup_$(date +%Y%m%d).tar.gz $tempdir"
tar -pczf $backupdir/$sitename/$sitename.backup_$(date +%Y%m%d%H%M).tar.gz $tempdir

#remove temp
echo "cleaning up $tempdir"
rm -rf $tempdir

#remove old files, older than 30 days
echo "Deleting old archives from $backupdir/$sitename"
find $backupdir/$sitename -type f -mtime +$days_to_keep -exec rm {} \;
{% endcodeblock %}</p>
