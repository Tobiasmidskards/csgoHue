const hue = require('node-hue-api');
const axios = require('axios');

export default class HueConnection {
  constructor(ip, username) {
    this.ip = ip;
    this.username = username;
    // this.ip = '192.168.1.17';
    // this.username = 'NaeHHJBevqz-2H66B20lLXOJzTGT-Vbn4wC5paRx';
  }

  getConnection() {
    if (!this.ip || !this.username) {
      return null;
    }

    this.api = new hue.HueApi(this.ip, this.username);
    return this.api;
  }

  searchBridge() {
    hue.nupnpSearch().then((result, err) => {
      if (err) throw err;

      this.ip = result[0].ipaddress;
      this.getUserName()
          .then((response) => {
            if (response.data[0].error) {
              alert('Link btn not pressed');
              return;
            }
            this.username = response.data[0].success.username;
          })
          .catch((err) => {
            throw err;
          });
    }).done();
  }

  getCreds() {
    return {
      ip: this.ip,
      username: this.username,
    };
  }

  getUserName() {
    return axios.post(`http://${this.ip}/api`, { devicetype: 'electron-hue-connection' });
  }
}
// module.exports = HueConnection;

