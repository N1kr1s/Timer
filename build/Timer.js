export class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.callbacks = callbacks;
        this.isRunning = false;
        this.startButton.addEventListener('click', this.start.bind(this));
        this.pauseButton.addEventListener('click', this.pause.bind(this));
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
    }
    start() {
        if (this.onStart)
            this.onStart(this.timeValue);
        if (!parseFloat(this.durationInput.value) ||
            !/(?<!\S)(\d+\.\d+)|(\d+)(?!\S)/gi.test(this.durationInput.value))
            return;
        if (!this.isRunning) {
            this.tick();
            this.timer = setInterval(this.tick.bind(this), 50);
            this.isRunning = !this.isRunning;
        }
    }
    pause() {
        clearInterval(this.timer);
        this.isRunning = false;
    }
    tick() {
        if (parseFloat(this.timeValue) < 0) {
            this.pause();
            if (this.onComplete)
                this.onComplete();
        }
        else {
            this.timeValue = this.timeValue;
            if (this.onTick)
                this.onTick(this.timeValue);
        }
    }
    get timeValue() {
        return (parseFloat(this.durationInput.value) - 0.05).toFixed(2).toString();
    }
    set timeValue(val) {
        this.durationInput.value = val;
    }
}
