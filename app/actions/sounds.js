import {SET_SOUNDS, SELECT_SOUND} from '../actionTypes';

/**
 * load synthdefs from included sound directory
 */
export function loadSounds(path) {
  return (dispatch) => {
    dispatch(setSounds([]));
  };
}

/**
 * set sounds (objects with synthdef descriptions) to store
 */
export function setSounds(sounds) {
  return {
    type: SET_SOUNDS,
    payload: {
      sounds
    }
  };
}

/**
 * select sound by name from interface
 */
export function selectSound(name) {
  return {
    type: SELECT_SOUND,
    payload: {
      name
    }
  };
}

export function spawnSynth(event) {
  callActionOnMain({
    type: SPAWN_SYNTH,
    payload: event
  });
}

export function setMasterControls(event) {
  callActionOnMain({
    type: SET_MASTER_CONTROLS,
    payload: event
  });
}
