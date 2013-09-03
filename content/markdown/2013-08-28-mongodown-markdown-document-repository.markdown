type: thought
title: MongoDown a markdown document repository solution
created: 2013-08-28 12:31
homepage: true
tag: MongoDown
tag: Python
tag: Javascript
tag: Open Source
tag: Markdown
tag: MongoDb
tag: Parse.com
aspot: false
gallery: mongodown-gallery


###I like Markdown

I have really grown to despise typing HTML into a textbox on a website.  Even worse is typing text into an online wysiwyg editor.  The HTML those editors produces is jenky at best.  Enter markdown.

There are a bunch of static site generators out there that produce static documents from markdown and do a great job.  Projects like Jekyll (ruby), Pelican (Python), do a fine job of this.  The thing that I am less impressed with is their ability to create adhoc collections of data.  They are also not as good for creating single page apps that consume this markdown content.  So I really was aiming to create a piece of software that could consume markdown and create a document collection with rich meta data to query from.

###My Solution

- Python
- Parse.com

###Uploading files to parse

Part of mongodown is the ability to create image galleries if you so desire.  

I used this block of code to iterate over presets that are defined to resize thumbnails or other needed assets for a given photo

	data = open(f.output_file, 'rb')
	headers = {
	    'X-Parse-Application-Id': self.settings["parse"]["application_id"],
	    'X-Parse-REST-API-Key': self.settings["parse"]["rest_api_key"],
	    'content-type': "image/jpeg"
	}
	                   url = "%s/%s" % (self.settings["parse"]["rest_file_url"], f.filename)
	r = requests.post(url, data=data, headers=headers)


