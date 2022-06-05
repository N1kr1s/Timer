import { Timer } from './Timer.js';
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = parseFloat(circle.getAttribute('r')) * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', String(perimeter));
let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeValue) {
        circle.setAttribute('stroke-dashoffset', String((perimeter * parseFloat(timeValue)) / parseFloat(duration) - perimeter));
    },
    onComplete() {
        console.log('timer is completed');
    },
});
