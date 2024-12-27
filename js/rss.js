//////////////////////////////
//  NixtyHome RSS to Post   //
//         by Geno          //
//////////////////////////////

function buildTemplater(doc)
{
	var dict = { hasImage: false, replace: {} };
	var e = getFirstValueByTag(doc);
	var isLegacy = doc.querySelectorAll == null;
	var nodes = isLegacy ? doc.childNodes : doc.querySelectorAll('*');
	for(var i = 0; i < nodes.length; i++)
	{
		var tag = isLegacy ? nodes[i].nodeName : nodes[i].tagName;
		dict['replace']['__' + tag.toUpperCase() + '__'] = e(tag);
		if(tag == 'image') dict['hasImage'] = true;
	}
	return dict;
}