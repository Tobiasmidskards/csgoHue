const Timer = require('tiny-timer');

export default class GameEventHandler {
  constructor(hueAction) {
    this.hueAction = hueAction;
    this.prev_state = '';
    this.bomb_time = 0;
    this.timer = this.timer = new Timer({ interval: 1000, stopwatch: false });
  }

  handleEvent(state) {
    console.log(`Game event Handling state: ${state}`);

    if (this.prev_state === state) {
      console.log('prev state match');
      return;
    }

    if (state !== 'planted') {
      this.timer.stop();
    }

    switch (state) {
      case 'ctwin':
        this.hueAction.ctwin();
        break;
      case 'twin':
        this.hueAction.twin();
        break;
      case 'freeze':
        this.hueAction.freeze();
        break;
      case 'default':
        this.hueAction.default();
        break;
      case 'off':
        this.hueAction.off();
        break;
      case 'planted':
        this.bombPlant(state);
        break;
      case 'defused':
        this.hueAction.defuse();
        break;
      case 'exploded':
        this.hueAction.explode();
        break;
      case 'colorloop':
        this.colorLoop();
        break;
      case 'sparkle':
        this.hueAction.sparkle();
        break;
      default:
        this.hueAction.default();
        break;
    }

    this.prev_state = state;
  }

  bombPlant(state) {
    if (state !== 'planted') return;
    this.hueAction.bombticking();
  }

  colorLoop() {
    this.hueAction.off();
    this.hueAction.colorloop();
  }

  getHueApi() {
    return this.hueAction.api;
  }

  // eslint-disable-next-line class-methods-use-this
  startup() {
  }
}
