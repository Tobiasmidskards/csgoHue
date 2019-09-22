# This is a fork
###Original https://github.com/alexander-wecode/csgoHue

# csgo-hue

Electron app for capturing csgo game events and triggering Hue lights based on game events

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## Notes
Only meant for one instance of the application to be run with one hue bridge. Don't really know how it will behave if several clients connect to the same hue bridge in a LAN setting.

## Csgo setup
In order to have your game send out game state information, download the gamestate_integration_hue.cfg file and place it in your csgo cfg folder.

On Mac terminal:
```
cd ~/Library/Application\ Support/Steam/steamapps/common/Counter-Strike\ Global\ Offensive/csgo/cfg/

open .
```
and place the gamestate_integration_wecode.cfg file in the finder window.

For windows, se other guides.

## Other guides
https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration
g
