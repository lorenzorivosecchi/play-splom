import {FOCUS_SCATTERPLOT, SET_HOVERING, ZOOM_SCATTERPLOT} from '../actionTypes';

/**
 */
export function focusScatterplot(id) {
  return {
    type: FOCUS_SCATTERPLOT,
    payload: {
      id
    }
  };
}

export function setHovering(id) {
  return {
    type: SET_HOVERING,
    payload: {
      id
    }
  };
}

export function zoomScatterplot(id) {
  return {
    type: ZOOM_SCATTERPLOT,
    payload: {
      id
    }
  };
}