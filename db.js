//Database
//Loads database on bottom of webpage after a couple of seconds

const profInfo = []


window.onload = function() {
    const url = "https://cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/1-tR6kESj1kzbR8j0AOO_t3mLvbMTynlif-dcqJbvfF0/export?format=csv";
    const main = document.querySelector("main");
    //main.innerHTML = "<p>Loading...</p>";
    fetch(url).then(result=>result.text()).then(function(csvtext) {
        return csv().fromString(csvtext);
    }).then(function(csv) {
        csv.forEach(function(row) {
            main.innerHTML += "<h3>" + row.Name + "</h3>";
            main.innerHTML += "<h3>" + row.RoomNumber + "</h3>";
            main.innerHTML += "<h3>" + row.Email + "</h3>";
            main.innerHTML += "<h3>" + row.OfficeLocation + "</h3>";
            main.innerHTML += "---------------------------------"
            profInfo.push(row)
        })
    });
}

console.log(profInfo);