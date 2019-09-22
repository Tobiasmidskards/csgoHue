<template>
    <div id="app" class="columns is-mobile">
        <div class="menu has-background-grey-dark has-text-white">
            <ul class="menu-list has-text-white">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/event-receiver">Event debugger</router-link>
                </li>
            </ul>
        </div>
        <div class="main column has-background-dark has-text-light">
            <router-view></router-view>
            <div class="creds">
                <span>IPs: <p v-for="i in ips">{{i}}, </p></span>
                <br>
                <button class="button is-warning is-small" v-on:click="resetCon">Reset</button>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex';
    import StateExtractor from './classes/StateExtractor';
    import GameEventHandler from './classes/GameEventHandler';
    import HueAction from './classes/hue/HueAction';

    const Store = require('electron-store');
    const http = require('http');

    export default {
        name: 'csgo-hue-controller',
        data() {
            return {
                server: null,
                data: null,
                lastState: '',
                gameEventHandler: null,
                hueAction: null,
                data_store: null,
                ips: this.ips,
                hue_username: null,
            };
        },
        mounted() {
            this.createHttpServer();
            this.setupHueConnection();
        },
        computed: {
            ...mapGetters([
                'game_data',
                'current_state',
            ]),
        },
        watch: {
            current_state() {
                this.handleNewGameEvent();
            },
        },
        methods: {
            ...mapActions(['setGameData', 'setCurrentState']),
            createHttpServer() {
                this.server = http.createServer((req, res) => {
                    const route = req.url;
                    console.log(route);
                    if (route === '/csgo' && req.method === 'POST') {
                        this.collectRequestData(req);
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(route);
                    res.end();
                }).listen(8080);
            },
            resetCon() {
                this.ips = [];
                this.hueAction.searchBridge();
                setTimeout(() => {
                    this.ips = this.hueAction.ips;
                }, 5000);
            },
            setupHueConnection() {
                this.data_store = new Store();
                this.hue_username = this.data_store.get('username');

                this.hueAction = new HueAction();
                this.gameEventHandler = new GameEventHandler(this.hueAction);
                setTimeout(() => {
                    this.$store.dispatch('setCurrentState', 'startup');
                    this.ips = this.hueAction.ips;

                    this.gameEventHandler.startup();
                }, 5000);
            },
            setupNewConnection() {
                alert('No Hue connection - Press the hue bridge button before accepting this alert');
                this.hueAction.searchBridge();

                setTimeout(() => {
                    const data = this.hueAction.getCreds();
                    console.log(data);
                    if (!data) {
                        this.setupHueConnection();
                        return;
                    }

                    this.data_store.set('ip', data.ip);
                    this.data_store.set('username', data.username);
                    this.setupHueConnection();
                }, 2000);
            },
            collectRequestData(request) {
                let body = '';
                request.on('data', (chunk) => {
                    body += chunk;
                });
                request.on('end', () => {
                    if (!body) {
                        return;
                    }
                    const postDataObject = JSON.parse(body);
                    this.$store.dispatch('setGameData', postDataObject);
                    this.handleGameData();
                });
            },
            handleGameData() {
                const state = StateExtractor.extract(this.game_data);
                console.log('handle game data: ', state);
                this.$store.dispatch('setCurrentState', state);
            },
            handleNewGameEvent() {
                console.log('watch working');
                this.gameEventHandler.handleEvent(this.current_state);
            },
        },
    };
</script>



<style lang="scss">
    @import './assets/style.scss';
</style>
