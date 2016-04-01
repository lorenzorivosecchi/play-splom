import {FOCUS_SCATTERPLOT, SET_HOVERING, ZOOM_SCATTERPLOT, MOUSE_MOVE,  SHOW_BRUSH} from '../actionTypes';
const u = require('updeep');

const initial = {
  focused: null,
  hovering: null,
  zoomed: null,
  mouse: null,
  brush: null
};

/**
 * To unfocus, set focused to null. same with hovering and zoomed
 */
export default function(state=initial, action) {
  switch (action.type) {

    case FOCUS_SCATTERPLOT:
      return u({
        focused: action.payload
      }, state);

    case SET_HOVERING:
      return u({
        hovering: action.payload
      }, state);

    case ZOOM_SCATTERPLOT:
      return u({
        zoomed: action.payload
      }, state);

    // in svg frame
    case MOUSE_MOVE:
      return u({
        mouse: action.payload
      }, state);

    case SHOW_BRUSH:
      return u({
        brush: action.payload
      }, state);

    default:
      return state;
  }
}
