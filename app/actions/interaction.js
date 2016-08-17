import * as _ from 'lodash';
import {
  SHOW_BRUSH,
  SET_POINTS_UNDER_BRUSH,
  TOGGLE_LOOP_MODE,
  SET_LOOPING
} from '../actionTypes';

export function showBrush(show, x, y) {
  return {
    type: SHOW_BRUSH,
    payload: {
      show,
      x,
      y
    }
  };
}

export function setPointsUnderBrush(m, n, indices) {
  return (dispatch, getState) => {
    const s = getState().interaction;
    const same = (_.isEqual(s.pointsUnderBrush, indices));
    if (!same) {
      dispatch({
        type: SET_POINTS_UNDER_BRUSH,
        payload: {
          indices,
          m,
          n
        }
      });
    }
  };
}


/**
 * toggleLoopMode - turns loop on, or changes it to a different box or turns it off
 *
 * @param  {number} m box coordinate
 * @param  {number} n box coordinate
 * @return {Object}   action
 */
export function toggleLoopMode(m, n) {
  return {
    type: TOGGLE_LOOP_MODE,
    payload: {
      m,
      n
    }
  };
}

