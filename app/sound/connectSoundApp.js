import {
  SPAWN_SYNTHS,
  SET_LOOP
} from '../actionTypes';

import {
  spawnEventsFromBrush,
  loopModePayload
} from '../selectors/index';

/**
 * Runs in the renderer process.
 *
 * Connects to the redux store and forwards actions
 * to the background process, where they are forwarded
 * to the SoundApp
 */

function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    const state = store.getState();
    const nextState = select(state);
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(state);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

const getPointsEntering = (state) => state.interaction.pointsEntering;
const getLoopMode = (state) => state.interaction.loopMode;

export default function connectSoundApp(store, callActionOnMain) {
  // call handler on change of pointsEntering
  observeStore(store, getPointsEntering, (state) => {
    // pointsEntering changed: m n indices
    // generate synths from that
    // for now: send using callActionOnMain
    // later: set to state.synth.spawnEvents
    // and let redux-electron-store copy it over
    const synthEvents = spawnEventsFromBrush(state);
    if (synthEvents.length) {
      callActionOnMain({
        type: SPAWN_SYNTHS,
        payload: synthEvents
      });
    }
  });

  observeStore(store, getLoopMode, (state) => {
    // on toggleLoopMode collect and send the SynthEventList to the loop player
    // or cancel it
    const payload = loopModePayload(state);
    console.log(payload);
    callActionOnMain({
      type: SET_LOOP,
      payload
    });
  });
}
