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
            //main.innerHTML += "<h3>" + row.First + " " + row.Last + "</h3>";
            profFNames.push(row.First);
            profLNames.push(row.Last);
            //main.innerHTML += "<h3>" + row.Email + "</h3>";
            profEmails.push(row.Email);
            //main.innerHTML += "<h3>" + row.OfficeLocation + "</h3>";
            profONum.push(row.OfficeLocation);
            //main.innerHTML += "---------------------------------"
            profInfo.push(row)
        })

        console.log(profInfo);
        console.log(profFNames);
        console.log(profLNames);
        console.log(profEmails);
        console.log(profONum);
        //console.log(formatProfInfo(profFNames[1], profLNames[1], profEmails[1], profONum[1]));

    });
}

function formatProfInfo(profFirstName, profLastName, profEmail, ProfRoom) {
    alert(prof = "Name: " + profFirstName + " " + profLastName + "\n" + "Email: " + profEmail + "\n" + "Room: " + ProfRoom);
}
//First set of offices infrom of room 104A 
function profOne() {
    formatProfInfo(profFNames[0], profLNames[0], profEmails[0], profONum[0]);
}

function profTwo() {
    formatProfInfo(profFNames[4], profLNames[4], profEmails[4], profONum[4]);
}

function profThree() {
    formatProfInfo(profFNames[16], profLNames[16], profEmails[16], profONum[16]);
}
function profFour() {
    formatProfInfo(profFNames[12], profLNames[12], profEmails[12], profONum[12]);
}
function profFive() {
    formatProfInfo(profFNames[9], profLNames[9], profEmails[9], profONum[9]);
}
function profSix() {
    formatProfInfo(profFNames[13], profLNames[13], profEmails[13], profONum[13]);
}
function profSeven() {
    formatProfInfo(profFNames[15], profLNames[15], profEmails[15], profONum[15]);
}
function profEight() {
    formatProfInfo(profFNames[10], profLNames[10], profEmails[10], profONum[10]);
}
function profNine() {
    formatProfInfo(profFNames[5], profLNames[5], profEmails[5], profONum[5]);
}
function profTen() {
    formatProfInfo(profFNames[14], profLNames[14], profEmails[14], profONum[14]);
}





