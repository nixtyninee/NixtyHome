//////////////////////////////
//   NixtyHome Feed Loader  //
//         by Geno          //
//////////////////////////////

// Init variables for later:
var listContainerTemplate = null;
var textPostTemplate = null;
var imagePostTemplate = null;

// Load the list container template:
getUrl("list_container_template.html", false, execOnSuccess(function(req)
{
	listContainerTemplate = req.responseText;
}));

// Load the text post template:
getUrl("text_post_template.html", false, execOnSuccess(function(req)
{
	textPostTemplate = req.responseText;
}));

// Load the image post template:
getUrl("image_post_template.html", false, execOnSuccess(function(req)
{
	imagePostTemplate = req.responseText;
}));

// Load the actual rss FEED:
getUrl("rss_feed.xml?time=" + new Date().getTime(), false, execOnSuccess(function (req)
{
	var formedListHtml = "";
	var posts = parseXmlString(req.responseText).getElementsByTagName("item");
	
	for(var i = 0; i < posts.length; i++)
	{
		var templater = buildTemplater(posts[i]);
		var keys = Object.keys(templater.replace);
		
		var formedPostHtml = (templater.hasImage) ? imagePostTemplate : textPostTemplate;
		for (var j = 0; j < keys.length; j++)
		{
			var key = keys[j];
			
			formedPostHtml = formedPostHtml.replace(new RegExp(key, "g"), templater.replace[key]);
		};
		
		formedListHtml = formedListHtml.concat(formedPostHtml);
	}
	
	document.getElementById("container").innerHTML = listContainerTemplate.replace("__LIST__", formedListHtml);
}));