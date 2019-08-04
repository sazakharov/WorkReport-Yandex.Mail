var content = document.getElementsByClassName("mail-MessageSnippet-Content");
var regTime = "";
var workTime = "";
var report = "";
for (i = 0; i < content.length; i++) {
	FromText = content[i].getElementsByClassName("mail-MessageSnippet-FromText")[0].innerText;
	subjItCount = content[i].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_text js-message-snippet-text")[0].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_subject")[0].childElementCount;
	SubjectText = content[i].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_text js-message-snippet-text")[0].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_subject")[0].children[subjItCount-1].innerText;
	labels = content[i].getElementsByClassName("mail-Label-Text");
	for (l = 0; l < labels.length; l++) {
		labText = labels[l].innerText
		if (labText.substr(3,1) == ":") {
			if (labText.substr(0,1).toUpperCase() == "R") {
				regTime = labText.substr(1,5);
			}
			if (labText.substr(0,1).toUpperCase() == "W") {
				workTime = labText.substr(1,5);
			}
		}
	}
	//console.log(FromText+"\t"+SubjectText+"\t"+regTime+"\t"+workTime+"\n");
	report = FromText+"\t"+SubjectText+"\t"+regTime+"\t"+workTime+"\n" + report;
	regTime = "";
	workTime = "";
}
console.log(report);
