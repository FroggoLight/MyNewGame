let validKeys = ["v", "b", "n", "m"];

const columns = Array.from(document.querySelectorAll(".NoteColumn"));
console.log(columns); 
console.log(columns[1]);
//columns[1].style.background = "linear-gradient(0deg, rgba(8,141,177,1) 0%, rgba(38,38,38,1) 10%)";

window.addEventListener("keydown", function (event) {
    let keyPressed = event.key;
    if (validKeys.includes(keyPressed)) {
        if (event.repeat) {
            return; //damn im so smart from using google
        } 
        let keyIndex = validKeys.indexOf(keyPressed);
        columns[keyIndex].style.background = "linear-gradient(0deg, rgba(8,141,177,1) 0%, rgba(38,38,38,1) 10%)";
        //on the press see if there are any notes to judge
        //console.log("a proper key was hit");
    }
    //now light up where it should belong
    //console.log(event.key);
});

window.addEventListener("keyup", function (event) {
    let keyPressed = event.key;
    if (validKeys.includes(keyPressed)) {
        let keyIndex = validKeys.indexOf(keyPressed);
        columns[keyIndex].style.background = "rgba(38,38,38,1)";
        //on the press see if there are any notes to judge
        //console.log("a proper key was hit");
    }
})

