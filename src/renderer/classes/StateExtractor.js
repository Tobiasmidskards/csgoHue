/* eslint-disable linebreak-style */
export default class StateExtractor {
  static extract(gamestate) {
    let state = null;
    if (gamestate && gamestate.round) {
      state = StateExtractor.round(gamestate.round);
    }

    return state;
  }

  static round(data) {
    // freeze
    if (data.phase === 'freezetime') {
      return 'freeze';
    }
    // live
    if (data.phase === 'live' && !data.bomb) {
      return 'default';
    }
    // bomb states
    if (data.bomb) {
      if (data.bomb === 'planted') return 'planted';
      if (data.bomb === 'exploded') return 'exploded';
      if (data.bomb === 'defused') return 'defused';
    }
    // ct win
    if (data.win_team === 'CT') {
      return 'ctwin';
    }
    if (data.win_team === 'T') {
      return 'twin';
    }

    return '';
  }
}
