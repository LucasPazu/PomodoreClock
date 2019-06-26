// DOM Elements
const time = document.querySelector('.time');
const timeBar = document.querySelector('.time__bar');
const mins = document.querySelector('.minutes');
const timer = document.querySelector('.clock__timer');

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

// Setting the timer
let isMouseDown = false;
const timeWidth = 500;
let minutes;

function mouseDown() {
    isMouseDown = true;
}

function mouseUp() {
    isMouseDown = false;
}

function chooseTime(e) {
    if(isMouseDown == true) {
        //console.log(sliderCursor);
        //console.log(sliderWidth);
        minutes = Math.round(e.offsetX / 500 * 60);
        mins.textContent = minutes + ' min';
        const minutesPerc = Math.round(minutes / 60 * 100) + '%';
        timeBar.setAttribute('style', 'width: ' + minutesPerc);
        console.log(minutes);
    }

}

// Countdown
function startCountdown() {
}

function resetCountDown(){
    timer.textContent = '00:00';
    timeBar.setAttribute('style', 'width: 33%');
    mins.textContent = '20 min';
}

// Events Listeners

time.addEventListener('mousemove', chooseTime);
window.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);

startBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountDown)

