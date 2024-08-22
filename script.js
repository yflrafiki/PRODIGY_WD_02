// Variables for stopwatch
let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 0;

// DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Add event listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Function to start or pause the stopwatch
function startPause() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 100);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    } else {
        running = false;
        clearInterval(interval);
        startPauseBtn.textContent = 'Start';
    }
}

// Function to reset the stopwatch
function reset() {
    running = false;
    clearInterval(interval);
    difference = 0;
    display.textContent = '00:00:00.0';
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
    lapCounter = 0;
}

// Function to record a lap
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsList.appendChild(lapTime);
    }
}

// Function to update the display
function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const milliseconds = Math.floor((difference % 1000) / 100);
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    const displayTime = 
        (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        milliseconds;

    display.textContent = displayTime;
}
