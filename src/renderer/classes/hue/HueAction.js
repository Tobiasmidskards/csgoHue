// const HueConnection = require('./HueConnection');

const axios = require('axios');
const myIp = require('my-local-ip')();

export default class HueAction {
  constructor() {
    this.ips = [];
    this.ipArray = myIp.split('.', 3);
    // eslint-disable-next-line prefer-destructuring
    this.ipMask = `${this.ipArray[0]}.${this.ipArray[1]}.${this.ipArray[2]}`;
    this.searchBridge();
  }
  singleLightsAction(light, state) {
    if (!this.api) return;

    this.api.setGroupLightState(light, state)
        .then((result) => {
          console.log(result);
        })
        .fail((error) => {
          throw error;
        })
        .done();
  }
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  interruptWhile(ip) {
    axios.get(`${ip}stop`)
        .catch((e) => {
          console.log(e);
        });
  }
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  allLightsAction(r, g, b, bri) {
    for (let i = 0; i < this.ips.length; i += 1) {
      axios.get(`${this.ips[i]}set?red=${r}&grn=${g}&blu=${b}&bri=${bri}`)
          .catch((e) => {
            console.log(e);
          });
    }
  }

  allLightsActionSpecial(special) {
    for (let i = 0; i < this.ips.length; i += 1) {
      axios.get(`${this.ips[i]}${special}`)
          .catch((e) => {
            console.log(e);
          });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  find(i) {
    return axios.get(`http://${this.ipMask}.${i}/find`);
  }

  searchBridge() {
    this.ips = [];
    for (let i = 0; i < 255; i += 1) {
      this.find(i)
          .then((resp) => {
            if (resp.data === 'CSGOLIGHT') {
              this.ips.push(`http://${this.ipMask}.${i}/`);
            }
          });
    }
  }

  getCreds() {
    return this.hueConnection.getCreds();
  }

  test() {
    setTimeout(() => {
      this.singleLightsAction(1, this.state.off);
      this.off();
      this.blink(1000, 0.5, 0.1557, 0.1454);
      setTimeout(() => { this.default(); }, 1000);
      setTimeout(() => { this.explode(); }, 5000);
      setTimeout(() => { this.freeze(); }, 10000);
      setTimeout(() => { this.defuse(); }, 15000);
      setTimeout(() => { this.colorloop(); }, 20000);
      setTimeout(() => { this.off(); }, 40000);
    }, 1000);
  }

  // eslint-disable-next-line no-unused-vars
  blink(sleep, transitionTime, x, y, bri = 254, sat = 254) {
    this.allLightsAction(255, 0, 0, bri);
    setTimeout(() => {
      this.off();
    }, sleep);
  }

  bombticking() {
    this.allLightsActionSpecial('bomb');
  }

  // eslint-disable-next-line class-methods-use-this
  off() {
    this.allLightsAction(0, 0, 0, 0);
    this.allLightsAction(0, 0, 0, 0);
  }

  ctwin() {
    this.allLightsAction(0, 0, 255, 255);
    this.allLightsAction(0, 0, 255, 255);
  }

  twin() {
    this.allLightsAction(255, 0, 0, 255);
    this.allLightsAction(255, 0, 0, 255);
  }

  default() {
    this.allLightsAction(50, 0, 50, 0);
    this.allLightsAction(50, 0, 50, 0);
  }

  explode() {
    this.allLightsActionSpecial('explode');
  }

  sparkle() {
    this.allLightsActionSpecial('sparkle');
  }

  freeze() {
    this.colorloop();
  }

  defuse() {
    console.log('defused!!"#');
    this.allLightsAction(0, 255, 0, 255);
    this.allLightsAction(0, 255, 0, 255);
  }

  startupBlink() {
    this.blink(1000, 0.5, 0.1557, 0.1454);
  }

  colorloop() {
    this.allLightsActionSpecial('sparkle');
  }
}
// module.exports = HueAction;
// const h = new HueAction();
// h.test();
