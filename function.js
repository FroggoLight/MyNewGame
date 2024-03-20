const validKeys = ["z", "x", "c", "v"];
const columns = Array.from(document.querySelectorAll(".NoteColumn"));

const rootVar = getComputedStyle(document.querySelector(":root"));

let totalScore = 0;
const scoreboard = document.querySelector(".Scoreboard");

let currentAccuracy = 0;
const accuracyboard = document.querySelector(".Accuracy");

let totalNotesProcessed = 0;

let accumulatedJudge = [0, 0, 0, 0, 0, 0];

const hitAccuracyArea = document.querySelector(".HitAccuracyDisplay");
hitAccuracyArea.addEventListener("animationend", (event) => {
    hitAccuracyArea.removeChild(event.target);
})
console.log(hitAccuracyArea);

/*
let tempthing = document.createElement("div");
tempthing.classList.add("JudgeAccuracy");
tempthing.style.height = "";
hitAccuracyArea.appendChild(tempthing);
*/

let startTime;
const delayConstant = 0.45;
let personalOffset = 0.1;

const audioContext = new AudioContext();
const audio = new Audio("./music/First_Choice.mp3");

const source = audioContext.createMediaElementSource(audio);

const volume = audioContext.createGain();
volume.gain.value = 0.05;

source.connect(volume);
volume.connect(audioContext.destination);

console.log(audioContext);

const tempChartData = [[1, 0, 0, 0], //1, additionaly this is why this needs to be stored in another file or smt most likely a json file
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
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],//2
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
                       [0, 0, 0, 0],//3
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
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
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1],//phase 1-2
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
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
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
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 1],
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
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],//phase 2-1
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],//phase 2-1.5
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 1, 0, 0],//phase 3-1
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 1],//phase 3-1.5
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],//3-1.75
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 1],//making sure this is 4-1
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],//4-1.25
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],//4-1.5
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],//4-1.75
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1],//4-2
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 0, 0, 1],//4-finale
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 1, 1, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [1, 1, 0, 0],
                       [0, 0, 1, 1],
                       [1, 0, 0, 0],
                       [0, 1, 1, 0],
                       [0, 0, 0, 1],
                       [1, 1, 0, 0],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],
                       [0, 0, 0, 1],
                       [0, 1, 1, 0],
                       [1, 0, 0, 0],
                       [0, 0, 1, 1],
                       [1, 1, 0, 0],
                       [0, 0, 1, 1],
                       [1, 1, 0, 0],
                       [0, 0, 1, 1],
                       [1, 1, 0, 0],
                       [0, 0, 1, 1],//vvv is end
                       [1, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 0, 1],
                       [0, 0, 1, 0],
                       [1, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 1, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [1, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 1, 0, 0],//final 32
                       [0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 0],
                       [1, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 1, 0, 0],
                       [1, 0, 0, 0],
                       [0, 0, 0, 0],
                       [1, 0, 0, 1],
                       [0, 0, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 1, 1],
                       [1, 1, 0, 0],
                       [1, 1, 0, 0],
                       [0, 0, 1, 1],
                       [0, 0, 1, 1],
                       [1, 1, 0, 1]];


//todo: put window event listeners into function that can be called

window.addEventListener("keydown", function (event) {
    let keyPressed = event.key;
    if (validKeys.includes(keyPressed)) {
        if (event.repeat) {
            return; //damn im so smart from using google
        } 
        let keyIndex = validKeys.indexOf(keyPressed);
        //columns[keyIndex].style.background = "rgba(38,38,38,1)";
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
        columns[keyIndex].style.background = "rgb(0, 0, 0)";
        //on the press see if there are any notes to judge
        //console.log("a proper key was hit");
    }
})

function noteMissListener() {
    columns.forEach((column) => {
        column.addEventListener("animationend", (event) => { //use settimeout to make it feel better, actually scrap that
            column.removeChild(event.target);
            updateDisplay("miss", 0, 0);
        })
    })
}


//to be initialized at start with some other things
noteMissListener();

function processHit(lane) {
    console.log(getComputedStyle(lane.firstChild).animationDelay);
    let noteDelayTime = parseFloat(getComputedStyle(lane.firstChild).animationDelay) * 1000;
    let hitTimeFrame = noteDelayTime - (Date.now() - startTime - (delayConstant * 1000) - (personalOffset * 1000));
    console.log(hitTimeFrame);
    if (Math.abs(hitTimeFrame) < 150) {
        calculateHitScore(hitTimeFrame);
        lane.removeChild(lane.firstChild);
    }
}

function calculateHitScore(timeFrame) {
    //if between 120 - 150 miss 0
    //if between 100 - 120 bad 10 
    //if between 60 - 100 ok 30
    //if between 40 - 60 good 50
    //if between 20 - 40 great 70
    //if between 0 - 20 perfect 100

    displayHitAccuracy(timeFrame);

    const trueFrame = Math.abs(timeFrame);
    if ((trueFrame > 140) && (trueFrame <= 150)) {
        updateDisplay(5, 0, 0);
    }
    else if ((trueFrame > 120)) {
        updateDisplay(4, 100, 10);
    }
    else if ((trueFrame > 100)) {
        updateDisplay(3, 200, 30);
    }
    else if ((trueFrame > 70)) {
        updateDisplay(2, 400, 50);
    }
    else if ((trueFrame > 40)) {
        updateDisplay(1, 700, 70);
    }
    else if ((trueFrame >= 0)) {
        updateDisplay(0, 1000, 100);
    }
    else {
        console.log("something went wrong I suppose");
    }

}

function displayHitAccuracy(timeFrame) {
    let accuracyColor = (150 - Math.abs(timeFrame)) * 0.75;
    let hitAccuracy = document.createElement("div");
    hitAccuracy.classList.add("JudgeAccuracy");
    hitAccuracy.style.animationTimingFunction = "linear";
    hitAccuracy.style.animationDuration = "3.0s";
    hitAccuracy.style.animationPlayState = "running";
    hitAccuracy.style.backgroundColor = "hsl(" + accuracyColor + ", 100%, 50%)";
    console.log(hitAccuracy.style.backgroundColor);
    hitAccuracy.style.translate = -(timeFrame * 1.5) + "px";
    hitAccuracyArea.appendChild(hitAccuracy);
}

function updateDisplay(judgeIndex, score, accuracy) {
    updateScore(score);
    updateAccuracy(accuracy);
    updateCurrentJudge(judgeIndex);
    //will use the string to update
    //add the score to total
}

function updateScore(score) {
    totalScore += score;
    scoreboard.textContent = "Score: " + totalScore;
}

function updateAccuracy(accuracy) {
    totalNotesProcessed += 1;
    currentAccuracy += accuracy;
    accuracyPercentage = (Math.round((currentAccuracy / totalNotesProcessed) * 100) / 100);
    accuracyboard.textContent = accuracyPercentage + "%";
}

function updateCurrentJudge(judgeIndex) {
    return;
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
                tempNote.style.animationDelay = audioContext.outputLatency + delayConstant + 0.2 + delayMultiplier * i + "s"; // for debugging
                tempNote.style.opacity = 0;
                tempNote.style.zIndex = 2;
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
//FOR FUTURE: [0, 1, 0, 0, 0, 8]    index 4 and 5 determine beat / division -> first of 1/8 in this case,
//            [0, 0, 1, 1, 1, 3]    second of 1/3 beat