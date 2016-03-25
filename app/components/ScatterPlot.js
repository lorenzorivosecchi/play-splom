const React = require('react');
const h = require('react-hyperscript');

import Point from './Point';
import {autoScale} from '../utils/mapping';

/**
 * Renders a single scatter plot on a parent svg g
 * props:
 *   dataset: miso dataset
 *   m:
 *   n:
 *   xName
 *   yName
 *   plotKey
 *   sideLength
 */
export default class ScatterPlot extends React.Component {

  render() {
    let innerHeight = this.props.sideLength;
    let innerWidth = innerHeight;

    // this would refetch even if the window size changed
    let ds = this.props.dataset;
    let xCol = ds.column(this.props.xName);
    let yCol = ds.column(this.props.yName);
    let xValues = xCol.data;
    let yValues = yCol.data;

    let xScale = autoScale(xValues, [0, innerWidth]);
    let yScale = autoScale(yValues, [0, innerHeight]);

    // draw a minimal L axis
    let h1 = innerHeight - 2;
    const axis = h('polyline', {
      points: `0,2 0,${innerHeight} ${h1},${innerHeight}`,
      strokeWidth: 1,
      stroke: '#888888',  // need access to theme here
      className: 'minimal-axis',
      fill: 'none'
    });

    let radius = innerHeight < 100 ? 1 : 3;
    const children = xValues.map((v, i) => {
      let x = xScale(v);
      let y = yScale(yValues[i]);
      return h(Point, {
        x: x,
        y: y,
        radius: radius,
        color: '#0000ff',  // get from theme
        id: '' + i,
        className: 'point'
      });
    });

    children.push(axis);

    return h('g', {
      transform: `translate(${this.props.xOffset}, ${this.props.yOffset})`,
      width: this.props.sideLength,
      height: this.props.sideLength
    }, children);
  }
}
