
// DOM Elements
const time = document.querySelector('.time');
const timeBar = document.querySelector('.time__bar');
const mins = document.querySelector('.minutes');
const clock = document.querySelector('.clock__timer');

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const arrowUp = document.querySelector('#arrow__up');
const arrowDown = document.querySelector('#arrow__down');

// Setting the timer
let isMouseDown = false;
const timeWidth = time.getAttribute('width');
let minutes = parseInt(mins.textContent);
let isRunning = false;


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
    }
    else {
        minutes = parseInt(mins.textContent)
    }


}

// Countdown
function startTimer() {
    const seconds = minutes * 60;
    timer(seconds);
}

function timer(seconds) {
    // clear any existing timers
    if(isRunning === true)clearInterval(countdown);

    isRunning = true;
    const now = Date.now();
    const then = now + seconds * 1000 // now is in milisconds
    displayTimeLeft(seconds)
    //displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if(secondsLeft < 0) {
            endSound();
            clearInterval(countdown);
            isRunning = false;
            return;
        }
        //console.log(secondsLeft);
        // display
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds =  seconds %= 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}`;
    clock.textContent = display;
    document.title = `${display} Pomodoro Clock`;
    //console.log(seconds)
}

function resetCountDown() {
    if(isRunning === true) {
        clearInterval(countdown);
        minutes = parseInt(mins.textContent);
        isRunning = false;
        clock.textContent = '00:00';
        document.title = 'Pomodoro Clock';
    }

}

function addMinute() {
    minutes ++;
    mins.textContent = minutes + ' min';

    const minutesPerc = Math.round(minutes / 60 * 100) + '%';
    timeBar.setAttribute('style', 'width: ' + minutesPerc);
}

function deductMinute() {
    minutes --;
    mins.textContent = minutes + ' min';

    const minutesPerc = Math.round(minutes / 60 * 100) + '%';
    timeBar.setAttribute('style', 'width: ' + minutesPerc);
}

function endSound() {
    const audio = new Audio('../to-the-point.mp3');
    audio.play();
}
// Events Listeners

time.addEventListener('mousemove', chooseTime);
window.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetCountDown)

arrowUp.addEventListener('click', addMinute);
arrowDown.addEventListener('click', deductMinute);


