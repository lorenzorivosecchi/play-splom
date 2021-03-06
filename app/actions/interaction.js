import _ from 'lodash';

export function showBrush(show, x, y) {
  return {
    type: 'showBrush',
    payload: {
      show,
      x,
      y
    }
  };
}

/**
 * setPointsUnderBrush - Called when moving the brush over points.
 *
 * Points under brush is further processed by the reducers into points entering.
 * The sound app responds to changes in point.
 *
 * @param  {number} m       box coordinate
 * @param  {number} n       box coordinate
 * @param  {Array} indices  list of point indices
 * @return {Object}         action
 */
export function setPointsUnderBrush(m, n, indices) {
  return (dispatch, getState) => {
    const s = getState().interaction;
    const same = _.isEqual(s.pointsUnderBrush, indices);
    if (!same) {
      dispatch({
        type: 'setPointsUnderBrush',
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
 * setLoopBox - Start loop at box, or change loop to box, toggle loop off if already playing.
 *
 * @param  {number} m box coordinate
 * @param  {number} n box coordinate
 * @return {Object}   action
 */
export function setLoopBox(m, n) {
  return {
    type: 'setLoopBox',
    payload: {
      m,
      n
    }
  };
}

/**
 * If is playing loop and loop box is set
 * then clip that to the current dataset dimensions.
 */
export function clipLoopBox() {
  return (dispatch, getState) => {
    const s = getState();
    const loopBox = _.get(s, 'interaction.loopMode.box');
    if (!loopBox) {
      return;
    }

    const dataset = _.get(s, '.dataset.data');
    if (!dataset) {
      return;
    }

    const maxDim = dataset.data.columnNames().length - 1;
    dispatch({
      type: 'setLoopBox',
      payload: {
        m: Math.min(loopBox.m, maxDim),
        n: Math.min(loopBox.n, maxDim)
      }
    });
  };
}

/**
 * toggleLoopMode - Turn looping on or off
 */
export function toggleLoopMode() {
  return {
    type: 'toggleLoopMode'
  };
}

/**
 * setLoopTime - Set time of loop in seconds.
 *
 * @param  {number} loopTime
 * @return {Object} action
 */
export function setLoopTime(loopTime) {
  return {
    type: 'setLoopTime',
    payload: {
      loopTime
    }
  };
}

/**
 * setLoopTimeDimension - Set the feature/dimension to be used for loop mode.
 *
 * @param  {number|null} index
 * @return {Object} action
 */
export function setLoopTimeDimension(index) {
  return {
    type: 'setLoopTimeDimension',
    payload: {
      index
    }
  };
}
