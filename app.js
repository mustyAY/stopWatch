const millis = document.querySelector(".timer__milliseconds");
const seconds = document.querySelector(".timer__seconds");
const minutes = document.querySelector(".timer__minutes");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");

let startTime;
let cancelId;
let savedTime = 0;

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  cancelId = requestAnimationFrame(updateTimer);
  startTime = Date.now();
}

function stopTimer() {
  stopButton.disabled = true;
  startButton.disabled = false;

  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);
}

function resetTimer() {
  startTime = Date.now();
  savedTime = 0;

  millis.innerHTML = "000";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
}

function updateTimer() {
  let millisElapsed = Date.now() - startTime + savedTime;

  let millisText = millisElapsed % 1000;
  let secondsText = Math.floor(millisElapsed / 1000) % 60;
  let minutesText = Math.floor(secondsText / 60);

  if (millisText.toString().length < 3) {
    millisText = millisText.toString().padStart(3, "0");
  }
  if (secondsText.toString().length < 2) {
    secondsText = secondsText.toString().padStart(2, "0");
  }
  if (minutesText.toString().length < 2) {
    minutesText = minutesText.toString().padStart(2, "0");
  }

  millis.innerHTML = millisText;
  seconds.innerHTML = secondsText;
  minutes.innerHTML = minutesText;

  cancelId = requestAnimationFrame(updateTimer);
}