function show(){
//   let scriptCode = `
//   document.querySelector("a[href='#sent'").click();
//   alert(document.querySelector("a[href='#sent'"))
//   `;
//   scriptCode = `
//   let tagName = "a";
//    Array.from(document.getElementsByTagName(tagName)).map(a => a.innerText);
//   `

   scriptCode = `
   function getReport(){
const content = document.getElementsByClassName("mail-MessageSnippet-Content");
let regTime = "";
let workTime = "";
let report = "";
for (let i = 0; i < content.length; i++) {
	let FromText = content[i].getElementsByClassName("mail-MessageSnippet-FromText")[0].innerText;
	let subjItCount = content[i].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_text js-message-snippet-text")[0].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_subject")[0].childElementCount;
	let SubjectText = content[i].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_text js-message-snippet-text")[0].getElementsByClassName("mail-MessageSnippet-Item mail-MessageSnippet-Item_subject")[0].children[subjItCount-1].innerText;
	let labels = content[i].getElementsByClassName("mail-Label-Text");
	for (let l = 0; l < labels.length; l++) {
		let labText = labels[l].innerText
		if (labText.substr(3,1) == ":") {
			if (labText.substr(0,1).toUpperCase() == "R") {
				regTime = labText.substr(1,5);
			}
			if (labText.substr(0,1).toUpperCase() == "W") {
				workTime = labText.substr(1,5);
			}
		}
	}
	report = FromText+String.fromCharCode(9)+SubjectText+String.fromCharCode(9)+regTime+String.fromCharCode(9)+workTime+String.fromCharCode(10)+String.fromCharCode(13)+ report;
	regTime = "";
	workTime = "";
}
console.log(report);
return report;
   }
getReport();
   `;
   chrome.tabs.executeScript({code: scriptCode}, function(result) {
     console.log(result[0]);
     document.querySelector("#container").innerHTML = "<pre>"+result[0]+"</pre>"
   });
}

function readFile(){
  const url = chrome.runtime.getURL('draft/report-xlsx/xl/worksheets/sheet1.xml');
  fetch(url, {
        headers : {
          'Content-Type': 'application/xml',
          'Accept': 'application/xml'
         }
      })
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.text().then(function(data) {
            // Out into popup.html
            (document.querySelector("#container").appendChild(document.createElement("pre"))).innerText = `data:\n${data}`;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

document.getElementById('do_report').onclick = show;
document.getElementById('do_readfile').onclick = readFile;
