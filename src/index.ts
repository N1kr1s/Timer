import { Timer } from './Timer.js';
const durationInput = document.querySelector('#duration') as HTMLInputElement;
const startButton = document.querySelector('#start') as HTMLButtonElement;
const pauseButton = document.querySelector('#pause') as HTMLButtonElement;
const circle = document.querySelector('circle') as SVGCircleElement;

const perimeter = parseFloat(circle.getAttribute('r') as string) * 2 * Math.PI;

circle.setAttribute('stroke-dasharray', String(perimeter));

let duration: string;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration: string) {
    duration = totalDuration;
  },
  onTick(timeValue: string) {
    circle.setAttribute(
      'stroke-dashoffset',
      String(
        (perimeter * parseFloat(timeValue)) / parseFloat(duration) - perimeter
      )
    );
  },
  onComplete() {
    console.log('timer is completed');
  },
});
