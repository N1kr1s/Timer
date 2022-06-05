interface Callbacks {
  onStart: (arg: string) => void;
  onTick: (arg: string) => void;
  onComplete: () => void;
}

export class Timer {
  timer!: number;
  isRunning: boolean;
  onStart?: (arg: string) => void;
  onTick?: (arg: string) => void;
  onComplete?: () => void;
  constructor(
    public durationInput: HTMLInputElement,
    public startButton: HTMLButtonElement,
    public pauseButton: HTMLButtonElement,
    public callbacks?: Callbacks
  ) {
    this.isRunning = false;
    this.startButton.addEventListener('click', this.start.bind(this));
    this.pauseButton.addEventListener('click', this.pause.bind(this));
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
  }

  start(): void {
    if (this.onStart) this.onStart(this.timeValue);

    if (
      !parseFloat(this.durationInput.value) ||
      !/(?<!\S)(\d+\.\d+)|(\d+)(?!\S)/gi.test(this.durationInput.value)
    )
      return;

    if (!this.isRunning) {
      this.tick();
      this.timer = setInterval(this.tick.bind(this), 50);
      this.isRunning = !this.isRunning;
    }
  }

  pause(): void {
    clearInterval(this.timer);
    this.isRunning = false;
  }

  tick(): void {
    if (parseFloat(this.timeValue) < 0) {
      this.pause();
      if (this.onComplete) this.onComplete();
    } else {
      this.timeValue = this.timeValue;
      if (this.onTick) this.onTick(this.timeValue);
    }
  }

  get timeValue(): string {
    return (parseFloat(this.durationInput.value) - 0.05).toFixed(2).toString();
  }

  set timeValue(val: string) {
    this.durationInput.value = val;
  }
}
