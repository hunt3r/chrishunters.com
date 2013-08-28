--tag:
layout: post
title: Powershell and LDAP
created: 2009-12-22 17:24:24 -05:00
categories: 
tag:Programming
tag:Windows Server
tag:Powershell
tag:LDAP
---
<p>If you've ever needed to create an LDAP aware powershell script, well you're in luck.&nbsp; You can use any .Net namespace within a powershell script.&nbsp; In this article you will find various functions that I have written to work with an LDAP directory.</p><h3>Gather all LDAP directory properties into a Hashtable as key/value pairs</h3><p>The purpose of this function is to return a simple object of key/value pairs that you can reference in other parts of your application without connecting to the directory again.</p><p>{% codeblock %}##add all ldap key/value pairs for a user to a hash
function gatherLDAP
{
	param ($alias)
	
	$Error.Clear()
	Write-Host "Gathering LDAP data for $alias in a hash"
	$LDAPfilter = "(uid=$($alias))"
	$LDAPdn = "LDAP://$LDAPserver/$LDAPBaseDN"
	$LDAPe = New-Object System.DirectoryServices.DirectoryEntry($LDAPdn,$LDAPadminUser,$LDAPadminPass, $LDAPauth)
	$LDAPds = New-Object system.DirectoryServices.DirectorySearcher($LDAPe,$LDAPfilter)
	$LDAPdsp = $LDAPds.FindOne()
	if ($LDAPdsp.psbase.Properties.uid.Count -gt 0)
	{
		#loop through all the property names
		foreach ($k in $LDAPdsp.psbase.properties.PropertyNames)
        {
            # Make each count, propertyname and value output look pretty much like LDAP does (ie tag:"#&gt;Name:Value")
            #write-host "$($objUser.psbase.properties[$k].count)&gt;$($k):$($objUser.psbase.properties[$k])"
			if ($($LDAPdsp.psbase.properties[$k].count) -gt 1)
			{
				foreach($v in $($LDAPdsp.psbase.properties[$k]))
				{
					$multiVal += ,$v
				}
				#add the multivalued attribute
				$ldapHash.Add($k, $multiVal)
			}
			else
			{
				$ldapHash.Add($k, $LDAPdsp.psbase.properties[$k])
			}
        }
	}
	
	$LDAPe.psbase.Close()
	$LDAPe.psbase.Dispose()
	
	#log errors to DB
	$rows = logErrors $alias $error
}{% endcodeblock %}</p><p>&nbsp;</p><p>This is a work in progress, I have a few more methods that I can add here, but they're not abstracted enough to be useful for a wide audience to consume.</p>
