const validKeys = ["z", "x", "c", "v"];
const columns = Array.from(document.querySelectorAll(".NoteColumn"));
const rootVar = getComputedStyle(document.querySelector(":root"));

let startTime;
const delayConstant = 0.45;
let personalOffset = 0.3;

const audioContext = new AudioContext();
const audio = new Audio("./music/First_Choice.mp3");

const source = audioContext.createMediaElementSource(audio);

const volume = audioContext.createGain();
volume.gain.value = 0.05;

source.connect(volume);
volume.connect(audioContext.destination);

console.log(audioContext);

const tempChartData = [[1, 0, 0, 0], //1
                       [0, 0, 0, 0], 
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0], //2
                       [0, 1, 0, 0], 
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1], //3
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1], //begin
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],];



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

function noteMiss() {
    columns.forEach((column) => {
        column.addEventListener("animationend", (event) => {
            column.removeChild(event.target);
        })
    })
}


//to be initialized at start with some other things
noteMiss();

function processHit(lane) {
    console.log(getComputedStyle(lane.firstChild).animationDelay);
    console.log(Date.now() - startTime);
    let noteDelayTime = parseFloat(getComputedStyle(lane.firstChild).animationDelay) * 1000;
    let hitTimeFrame = Math.abs(noteDelayTime - (Date.now() - startTime - (delayConstant * 1000) - (personalOffset * 1000)));
    console.log(hitTimeFrame);
    if (hitTimeFrame < 200) {
        lane.removeChild(lane.firstChild);
    }
}

function generateLaneNotes(chartData) {
    let delayMultiplier = 15/150;  //divided by bpm, need to implement later
    console.log(audioContext.outputLatency + delayConstant);
    for (i = 0; i < chartData.length; i++) {
        for (j = 0; j < 4; j++) {
            if (chartData[i][j] == 1) {
                let tempNote = document.createElement("div");
                tempNote.classList.add("notes");
                tempNote.style.animationName = "moveDown";
                tempNote.style.animationTimingFunction = "linear";
                tempNote.style.animationDuration = "0.8s";      
                tempNote.style.animationDelay = audioContext.outputLatency + delayConstant + delayMultiplier * i + "s"; // for debugging
                tempNote.style.opacity = 0;
                tempNote.style.animationPlayState = "paused";
                columns[j].appendChild(tempNote);
            }
        }
    }
}

//generateLaneNotes(tempChartData);


function playSong() {
    if (audioContext.state === "suspended") {
        setTimeout(function() {
            audioContext.resume();
            audio.play();
            console.log(audioContext);
        }, 1000);
        startTime = Date.now();
        generateLaneNotes(tempChartData);
        document.querySelectorAll(".notes").forEach(function(note) {
            note.style.animationPlayState = "running";
        })
    }

}

//TODO add canplaythrough



//use getcomputedstyle and time to determine judge
//if a note is not within a certain ms of window (aka ms * distance between the perfect judge), then do nothing
//else, we perform a judgement on the note
//next up on the todo?
// add music
// sync music - is is better to hardcode bpm or use something to detect bpm? perhaps web audio api
