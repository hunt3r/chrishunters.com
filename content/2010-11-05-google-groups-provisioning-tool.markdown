type: thought
title: Google Groups Provisioning Tool
created: 2010-11-05 15:38:35 -04:00
categories: 
tag:Python
tag:Google Apps
tag:Groups
tag:Linux
tag:MySQL
tag:Programming
tag:Google Groups

type: thought
title: Google Groups Provisioning Tool
created: 2010-11-05 15:38:35 -04:00
categories: 
tag:Python
tag:Google Apps
tag:Groups
tag:Linux
tag:MySQL
tag:Programming
tag:Google Groups

gGroupsProvision (gProv) is a Python and [<span style="color: #000000;">MySQL</span>](http://www.mysql.com/ "MySQL an extensible open source database, supporting T-SQL") based provisioning and synchronization tool for [<span style="color: #000000;">Google Appsgroups</span>](http://www.google.com/support/a/bin/answer.py?hl=en&amp;answer=33329 "Google apps for business, groups, e-mail lists"). This tool grew out of a need to create e-mail lists on the google apps domain of a [<span style="color: #000000;">non-profit</span>](http://www.phillymtb.org "The Philadelphia Mountain Biking Association (PMBA), is a non-profit chapter organization of the International Mountain Biking Association (IMBA)") I do work for.We have a number of different mailing lists that we want to maintain based on user roles and membership. As well as the results of specific ad-hoc queries. gProv is configurable via an [XML settings file](#settings "settings.xml"). You will need a Google Apps for Business domain, as well as administrator access so that you can create a service account for the gProv. 

### [Download from GitHub](https://github.com/hunt3r/gGroupsProvision "gGroupsProvision on GitHub.com")

### Dependencies

*   Google Apps Domain
*   Python 2.5+
*   GData Python Client for Python
*   MySQLdb Python library
        * I ran into some trouble installing this on ubuntu 9.04, a version conflict, [solved it here.](http://ubuntuforums.org/showthread.php?t=369409&amp;page=2 "Error with version 1.2.3._mysql 1.2.2")
* There's excellent documentation for the [google apps API's ](http://code.google.com/googleapps/domain/gdata_provisioning_api_v2.0_developers_protocol.html "Google Docs for all API")as well as a specific GData [Python client doc](http://code.google.com/googleapps/domain/gdata_provisioning_api_v2.0_reference_python.html "Python FTW").

No README.txt yet, but will add to git hub soon enough.

## provision.py

This is the main business of the application. You'll call this file to start the application on CRON at an interval that makes sense for you. I was thinking of adding more logic to the scheduling, but for now all groups are synchronized on every run of the application. So be careful, if you configure your CRON interval to something that's too short you could inadvertently create a [race condition](http://en.wikipedia.org/wiki/Race_condition "Race Conditions are bad")if it were configured for a large set of users and groups. Which would be bad... @2am, on a Saturday. After...

So.<span style="font-size: 10.8px;">I ended up going with a pattern where for each &lt;group&gt; node in settings.xml, it does the following:</span>

*   Get settings information from gsettings.py
*   Checks to see if the group exists, if not create it
*   Run &lt;query&gt; on mysql database for list of emails matching criteria
*   Add any emails to list that do not presently exist in google apps list
*   Remove any mails that do exist in google apps list that do not exist in latest SQL data
*   Add Owners to list

Rather than deleting the lists then recreating them, I took a little longer approach and synchronized them with the results of the query you'll run. If an email address is found in query but is not found in the google group, it will be added to the list. If a there is an email found in the list which is not found in the query it will be removed. Pretty simple really.

You may find the comments on the script useful, I tried to break it up into functional parts as much as possible.

I'll just point out a few key areas of the application

Here we get all the settings info from the settings library. We also instantiate the google apps service.

    :::python
    #Begin Local Vars
    gsettings=gs.getGoogleSettings()
    dbsettings=gs.getDbSettings()
    groups=gs.getGroups()
    #Instantiate Google Apps service here                                                                       
    service=gdata.apps.groups.service.GroupsService(email=gsettings['g_email'], domain=gsettings['g_domain'], password=gsettings['g_pass'])
    service.ProgrammaticLogin()
    #End Local Vars

I'm still learning OO Python, a lot of the python I've done in the past has been mostly procedural, so I'm still learning the best way to do some common things.

In the synchronizing portion of the code, I want to basically compare two different data types. I had an object and a tuple. The easiest way that I could see to compare these things was to convert them both to standard Lists, then use the following method to check each email against the list.

I basically looped through both lists and called this function against the other list. 

{% codeblock %}# compareStr(String str1, String str2)
# Simple string comparison
def compareStr(str1, str2):
    if str1 == str2:
        return 1
    else:
        return 0

# find(String str, List seq)
# Simple utility to see if a string exists in a List)
def find(str, seq):
    for item in seq:
        if compareStr(str,item): 
            return item{% endcodeblock %}

A better way:I did find a way to compare two lists once converted to a standard format by subtracting two lists, with a set command, I'll probably refactor that at some point

{% codeblock %}lst1=[1,2,3,45,5,8,9,11]
lst2=[8,9]
lst3=list(set(lst1)-set(lst2)){% endcodeblock %}

The Sync handler works like this. 

{% codeblock %}# syncGroup(String groupId, List dbUsers)
# Compares what's found out on the cloud, with what we find in the database query
# If something is found in the cloud and not in the query, it's deleted
# If something is found in the database and not in the cloud, its added
def syncGroup(groupId, dbUsers):
    print "Syncing group %s"%(groupId)
    if groupExists("%s@%s"%(groupId, gSettings['g_domain'])):
        members=convertGroupMembersToDict(getMembers(groupId))
        #Add new users to the group
        print "Remove users not found database query from group"
        for member in members:
            if not find(member.lower(), dbUsers):            
              removeUserFromGroup(groupId, member)
        print "Done."
        print "Add users found in database, but not already in google group"
        #Remove users from the list that aren't in the datafeed anymore
        for email in dbUsers:
            #Probably a better way to search in the members collection here, kinda hacked it
            if not find(email, members):
              addUserToGroup(groupId, email)
        print "Done."{% endcodeblock %}

It's pretty important to set permissions on your groups, so most of my groups include owners in the &lt;owner&gt; node of the group settings. Here's how you add owners to an existing group. I call these methods at the end, owners are deleted and added each time.

    # addOwner(String grupId, String owner)
    # makes a call to service to add an owner to the group
    def addOwner(groupId, owner):
        try:
            #first we need to be sure this user is in the list
            addUserToGroup(groupId, owner)
            #sleep a second to be sure it's registered
            time.sleep(1)
            #Then we add them as an owner
            service.AddOwnerToGroup(owner, groupId)
            print "Adding %s as owner"%(owner)
        except Exception, err:
            print err

    # addOwners(Dictionary group)
    # Split the owner property, loop through list, add owners
    def addOwners(group):
        for owner in group['owner'].split(','):
            if validateEmail(owner):
                addOwner(group['id'], owner)

Obviously go ahead and download the source to see how the rest of it works, it's not necessarily revolutionary stuff, but it should get the job done for you.

### <a name="settings"></a>settings.xml

Below you see the basic structure of the configuration. It's pretty self explanatory, there's settings for database and googleapps, and below that are the iterations of the main loop (groups).

The &lt;groups&gt; block, which is where you define your group and your groups data source.


*   ID: This is the name of your group so &lt;id&gt;@&lt;g_domain&gt;Owner tag:Owners of the group
*   Permissions: This tag defines who can send to this list. Here are the applicable settings:

        *   Owner tag:Owners only
    *   Member tag:Members of the Group
    *   Domain tag:Anyone in this domain
    *   Anyone tag:Anyone on the internet (Use with caution)
*   Name: Name given to the group, also appears in correspondence
*   Description: A description of the group, shows on google backend
*   Owner: one or many emails comma seperated, this is used when defining Owners of the group, especially important on groups with Ownerpermission set
*   Query: This attribute is where you define the SQL query you want to call on the database to get the list of emails for this list. <div><span style="line-height: 8px;">{% codeblock %}&lt;?xml version="1.0"?&gt;
&lt;root&gt;
    &lt;settings&gt;
      &lt;database&gt;
        &lt;db_host&gt;localhost&lt;/db_host&gt;
        &lt;db_port&gt;3306&lt;/db_port&gt;
        &lt;db&gt;myDB&lt;/db&gt;
        &lt;db_user&gt;myDbUser&lt;/db_user&gt;
        &lt;db_pass&gt;myDbPass&lt;/db_pass&gt;
      &lt;/database&gt;  
      &lt;googleapps&gt;
        &lt;g_user&gt;googleUser&lt;/g_user&gt;
        &lt;g_pass&gt;googlePass&lt;/g_pass&gt;
        &lt;g_domain&gt;mydomain.org&lt;/g_domain&gt;
      &lt;/googleapps&gt;
    &lt;/settings&gt;
    &lt;groups&gt;
      &lt;group&gt;
        &lt;id&gt;MyTest1&lt;/id&gt;
        &lt;permissions&gt;Owner&lt;/permissions&gt;
        &lt;name&gt;My Full Name For Test 1&lt;/name&gt;
        &lt;description&gt;Test 1 Decription&lt;/description&gt;
        &lt;owner&gt;hunter@phillymtb.org, president@phillymtb.org&lt;/owner&gt;
        &lt;query&gt;select mail from users where name like '%hunter%' or name like 'fish%'&lt;/query&gt;
      &lt;/group&gt;
      &lt;group&gt;
        &lt;id&gt;My Test 2&lt;/id&gt;
        &lt;permissions&gt;Owner&lt;/permissions&gt;
        &lt;name&gt;My Full Name For Test 2&lt;/name&gt;
        &lt;description&gt;My new great test is really cool&lt;/description&gt;
        &lt;owner&gt;hunter@phillymtb.org, president@phillymtb.org&lt;/owner&gt;
        &lt;query&gt;select mail from users limit 0,10&lt;/query&gt;
      &lt;/group&gt;
    &lt;/groups&gt;
&lt;/root&gt;{% endcodeblock %}</span></div>

### gsettings.py

Now, lets take a look at the gsettings.py file, this is basically a quick and dirty way to read in the XML and create a couple dictionaries of the values, with basic validation for things like groupId, which cannot have any special characters. I make a couple calls to this module at the start of provision.py. Also, the settings file and gsettings.py must be in the same directory as this file, you can adjust the first few lines of this file to change that if you need to.

I used ElementTree to do the parsing. This is my first time parsing xml in python, and I'm by no means an XML guru, so please make a comment if you think I could do this more recursively. I was looking for a quick way to deserialize this into an object with a single method, but reacheddiminishingreturns on time researching before I could find it. Here's an example of how I returned the XML as a Dictionary to the main logic.

{% codeblock %}# getDbSettings
# This parses the root ElementTree into a hashtable of settings values
# for the MySQL database
# Return Hashtable
def getDbSettings():
    #traverse the xml file (albeit simplistically)
    root = tree.getroot()
    settings = root.find('settings')
    database = settings.find('database')
    db_user=returnNodeText(database.find('db_user'), 'DefaultUser')
    db_pass=returnNodeText(database.find('db_pass'),'DefaultPass')
    db_host=returnNodeText(database.find('db_host'),'DefaultHost')
    db=returnNodeText(database.find('db'),'DefaultDb')
    db_port=returnNodeText(database.find('db_port'),3306)
    settingsHash= {'db_user':db_user,'db_pass':db_pass,'db_host':db_host,'db':db,'db_port':db_port}
    return settingsHash
{% endcodeblock %}

I hope you find this script useful. It was supposed to be something quick and dirty, but turned into just something dirty... But, I have plans to add an "auto sync" for Drupal organic groups, which will create inbound google apps groups based on membership of organic groups on a Drupal site. I need to figure out an opt-out functionality as well, not quite sure how I want to manage that just yet. New job, plenty to learn, this will probably have to do for a while.

Hunter
