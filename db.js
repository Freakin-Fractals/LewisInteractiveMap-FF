//Database
//Loads database on bottom of webpage after a couple of seconds

const profInfo = []
const profFNames = []
const profLNames = []
const profEmails = []
const profONum = []



window.onload = function() {
    const url = "https://cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/1-tR6kESj1kzbR8j0AOO_t3mLvbMTynlif-dcqJbvfF0/export?format=csv";
    const main = document.querySelector("main");
    fetch(url).then(result=>result.text())
    .then(function(csvtext) {
        jsontxt = csv().fromString(csvtext);
        console.log(jsontxt);
        return jsontxt
    }).then(
        function(csv) {
        csv.forEach(function(row) {
            main.innerHTML += "<h3>" + row.First + " " + row.Last + "</h3>";
            profFNames.push(row.First);
            profLNames.push(row.Last);
            main.innerHTML += "<h3>" + row.Email + "</h3>";
            profEmails.push(row.Email);
            main.innerHTML += "<h3>" + row.OfficeLocation + "</h3>";
            profONum.push(row.OfficeLocation);
            main.innerHTML += "---------------------------------"
            profInfo.push(row)
        })
    });
}

console.log(profInfo);
console.log(profFNames);
console.log(profLNames);
console.log(profEmails);
console.log(profONum);

console.log(profFNames[1]);
