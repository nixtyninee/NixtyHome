//////////////////////////////
//        XML helper        //
//         by Geno          //
//////////////////////////////

function getFirstValueByTag(doc)
{
	return function(tag) 
	{
		return doc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
	}
}