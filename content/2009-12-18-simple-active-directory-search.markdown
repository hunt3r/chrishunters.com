title: Simple Active Directory Search
created: 2009-12-18 19:17:10 -05:00
type: thought
tag: Powershell
tag: Microsoft
tag: LDAP
tag: .Net

Here's some sample code on how you can search active directory for a username via powershell / .Net.  This is probably not the most elegant of solutions but it worked for me.

      //Check to see if this user exists
      public bool UserExists(string username)
      {
         DirectoryEntry de = GetDirectoryEntry();
         DirectorySearcher deSearch = new DirectorySearcher();

         deSearch.SearchRoot = de;
         deSearch.Filter = "(&amp;(objectClass=user) (cn=" + username + "))";

         SearchResultCollection results = deSearch.FindAll();

         return results.Count &gt; 0;
      }

      private String FindName(String userAccount)
      {
         DirectoryEntry entry = GetDirectoryEntry();
         String account = userAccount.Replace(@"Domain\", "");

         try
         {
            DirectorySearcher search = new DirectorySearcher(entry);
            search.Filter = "(SAMAccountName=" + account + ")";
            search.PropertiesToLoad.Add("displayName");

            SearchResult result = search.FindOne();

            if (result != null)
            {
               return result.Properties["displayname"][0].ToString();
            }
            else
            {
               return "Unknown User";
            }
         }
         catch (Exception ex)
         {
            string debug = ex.Message;

            return "";
         }
      }
