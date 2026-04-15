class BlockTimer {
  private lastRun: number;
  private lastDelay: number;

  constructor() {
    this.lastRun = Date.now();
    this.lastDelay = 0;
  }

  execute(func: () => void, delay: number = 500): void {
    const now = Date.now();

    if (this.lastRun + this.lastDelay < now) {
      this.lastRun = now;
      this.lastDelay = delay;
      func();
    }
  }
}

const blockTimer = new BlockTimer();

export default blockTimer;
