//Database

const profInfo = []
const profFNames = []
const profLNames = []
const profEmails = []
const profONum = []



window.onload = function() {         //Herokuapp that is in the url is used to set up a demo server so that cors can be disabled, if undefined comes up int he console or app just go into the console, selected the herokup app demo link, and start the temp server.
    const url = "https://cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/1-tR6kESj1kzbR8j0AOO_t3mLvbMTynlif-dcqJbvfF0/export?format=csv";
    const main = document.querySelector("main");
    fetch(url).then(result=>result.text())
    .then(function(csvtext) {
        //Converts text into csv with a script imported from https://www.npmjs.com/package/convert-csv-to-json
        //Script is in header tag in index.html
        jsontxt = csv().fromString(csvtext);  
        console.log(jsontxt);
        return jsontxt //Returns text as json if it is needed
    }).then(
        function(csv) {
        csv.forEach(function(row) {
            //Loads database on bottom of webpage after a couple of seconds
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

        //console.log(profInfo);  //After retrieveing elemts from the database, cretes arrays in the console.
        //console.log(profFNames);
        //console.log(profLNames);
        //console.log(profEmails);
        //console.log(profONum);

    });
}

function formatProfInfo(profFirstName, profLastName, profEmail, ProfRoom) {
    alert(prof = "Name: " + profFirstName + " " + profLastName + "\n" + "Email: " + profEmail + "\n" + "Room: " + ProfRoom);
}
//First set of offices infrom of room 104A 
function profOne() { //Professor Pogue
    formatProfInfo(profFNames[0], profLNames[0], profEmails[0], profONum[0]);
}

function profTwo() { // Professor Dominak
    formatProfInfo(profFNames[4], profLNames[4], profEmails[4], profONum[4]);
}

function profThree() { //professor Mahmood
    formatProfInfo(profFNames[16], profLNames[16], profEmails[16], profONum[16]);
}
function profFour() { //Professor Speva
    formatProfInfo(profFNames[12], profLNames[12], profEmails[12], profONum[12]);
}
function profFive() { //Professor Plass
    formatProfInfo(profFNames[9], profLNames[9], profEmails[9], profONum[9]);
}
function profSix() { //Professor Wedyan
    formatProfInfo(profFNames[13], profLNames[13], profEmails[13], profONum[13]);
}
function profSeven() { //Professor Paul Kim
    formatProfInfo(profFNames[15], profLNames[15], profEmails[15], profONum[15]);
}
function profEight() { //Professor Spangler
    formatProfInfo(profFNames[10], profLNames[10], profEmails[10], profONum[10]);
}
function profNine() { //Professor Sung Kim
    formatProfInfo(profFNames[5], profLNames[5], profEmails[5], profONum[5]);
}
function profTen() { //Professor Alzoubi
    formatProfInfo(profFNames[14], profLNames[14], profEmails[14], profONum[14]);
}





