const validKeys = ["z", "x", "c", "v"];

const columns = Array.from(document.querySelectorAll(".NoteColumn"));

const rootVar = getComputedStyle(document.querySelector(":root"));

const tempChartData = [[1, 1, 0, 0],
                       [0, 0, 0, 0], 
                       [1, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 1, 0, 1],
                       [0, 0, 1, 0], 
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 1, 0, 1]];



window.addEventListener("keydown", function (event) {
    let keyPressed = event.key;
    if (validKeys.includes(keyPressed)) {
        if (event.repeat) {
            return; //damn im so smart from using google
        } 
        let keyIndex = validKeys.indexOf(keyPressed);
        columns[keyIndex].style.background = "rgba(55,55,55,1)";
        if (columns[keyIndex].firstChild != null) {
            processHit(columns[keyIndex]);
        }
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

function processHit(lane) {
    lane.removeChild(lane.firstChild);
}

function generateLaneNotes(chartData) {
    let delayMultiplier = 0.08;
    for (i = 0; i < chartData.length; i++) {
        for (j = 0; j < 4; j++) {
            if (chartData[i][j] == 1) {
                let tempNote = document.createElement("div");
                tempNote.classList.add("notes");
                tempNote.style.animationName = "moveDown";
                tempNote.style.animationTimingFunction = "linear";
                tempNote.style.animationDuration = "0.8s";
                tempNote.style.animationDelay = delayMultiplier * i + "s"; // for debugging
                tempNote.style.opacity = 0;
                tempNote.style.animationPlayState = "running";

                columns[j].appendChild(tempNote);
            }
        }
    }
}



generateLaneNotes(tempChartData);
//if a note is not within a certain ms of window (aka ms * distance between the perfect judge), then do nothing
//else, we perform a judgement on the note

