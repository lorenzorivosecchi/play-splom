import React from 'react';


/**
 * Draws ticks along an axis - used by XAxis and YAxis
 *
 * https://github.com/esbullington/react-d3
 */
export default React.createClass({

  displayName: 'AxisTicks',

  propTypes: {
    scale: React.PropTypes.func.isRequired,
    orient: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    orient2nd: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    horizontal: React.PropTypes.bool,
    tickArguments: React.PropTypes.array,
    tickValues: React.PropTypes.array,
    innerTickSize: React.PropTypes.number,
    outerTickSize: React.PropTypes.number,
    tickPadding: React.PropTypes.number,
    tickFormat: React.PropTypes.func,
    tickStroke: React.PropTypes.string,
    gridHorizontal: React.PropTypes.bool,
    gridVertical: React.PropTypes.bool,
    gridHorizontalStroke: React.PropTypes.string,
    gridVerticalStroke: React.PropTypes.string,
    gridHorizontalStrokeWidth: React.PropTypes.number,
    gridVerticalStrokeWidth: React.PropTypes.number,
    gridHorizontalStrokeDash: React.PropTypes.string,
    gridVerticalStrokeDash: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickStroke: '#000',
      tickPadding: 3,
      tickArguments: [10],
      tickValues: null,
      gridHorizontal: false,
      gridVertical: false,
      gridHorizontalStroke: '#D8D7D7',
      gridVerticalStroke: '#D8D7D7',
      gridHorizontalStrokeWidth: 1,
      gridVerticalStrokeWidth: 1,
      gridHorizontalStrokeDash: '5, 5',
      gridVerticalStrokeDash: '5, 5'
    };
  },

  render: function render() {
    const props = this.props;

    let tr;
    let textAnchor;
    let textTransform;
    let tickFormat;
    let y1;
    let y2;
    let dy;
    let x1;
    let x2;

    let gridStrokeWidth;
    let gridStroke;
    let gridStrokeDashArray;
    let x2grid;
    let y2grid;
    let gridOn = false;
    let ticks;

    const sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    const tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    const scale = props.scale;

    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks) {
      ticks = scale.ticks.apply(scale, props.tickArguments);
    } else {
      ticks = scale.domain();
      // classes
      // console.log('AxisTicks', ticks);
    }

    if (props.tickFormatting) {
      tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
      tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
      tickFormat = (d) => d;
    }

    const adjustedScale = scale.rangeBand ? d => scale(d) + scale.rangeBand() / 2 : scale;

    // Still working on this
    // Ticks and lines are not fully aligned
    // in some orientations
    switch (props.orient) {
      case 'top':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = 'middle';
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy = sign < 0 ? '0em' : '.71em';
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'bottom':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = 'middle';
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy = sign < 0 ? '0em' : '.71em';
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'left':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = 'end';
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = '.32em';
        x2grid = props.width;
        y2grid = 0;
        break;
      case 'right':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = 'start';
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = '.32em';
        x2grid = -props.width;
        y2grid = 0;
        break;
      default:
        break;
    }

    if (props.horizontalChart) {
      textTransform = 'rotate(-90)';
      [y1, x1] = [x1, -y1 || 0];

      switch (props.orient) {
        case 'top':
          textAnchor = 'start';
          dy = '.32em';
          break;
        case 'bottom':
          textAnchor = 'end';
          dy = '.32em';
          break;
        case 'left':
          textAnchor = 'middle';
          dy = sign < 0 ? '.71em' : '0em';
          break;
        case 'right':
          textAnchor = 'middle';
          dy = sign < 0 ? '.71em' : '0em';
          break;
        default:
          break;
      }
    }

    if (props.gridHorizontal) {
      gridOn = true;
      gridStrokeWidth = props.gridHorizontalStrokeWidth;
      gridStroke = props.gridHorizontalStroke;
      gridStrokeDashArray = props.gridHorizontalStrokeDash;
    } else if (props.gridVertical) {
      gridOn = true;
      gridStrokeWidth = props.gridVerticalStrokeWidth;
      gridStroke = props.gridVerticalStroke;
      gridStrokeDashArray = props.gridVerticalStrokeDash;
    }

    // return grid line if grid is enabled and grid line is not on at same position as other axis.
    const gridLine = (pos) => {
      if (gridOn
        && !(props.orient2nd === 'left' && pos === 0)
        && !(props.orient2nd === 'right' && pos === props.width)
        && !((props.orient === 'left' || props.orient === 'right') && pos === props.height)
      ) {
        return (
          <line
            style={{
              strokeWidth: gridStrokeWidth,
              shapeRendering: 'crispEdges',
              stroke: gridStroke,
              strokeDasharray: gridStrokeDashArray
            }}
            x2={x2grid}
            y2={y2grid}
          />
        );
      }

      return null;
    };

    const optionalTextProps = textTransform ? {
      transform: textTransform
    } : {};

    return React.createElement(
      'g',
      null,
      ticks.map((tick, idx) => {
        return React.createElement(
          'g',
          {key: idx, className: 'tick', transform: tr(tick)},
          gridLine(adjustedScale(tick)),
          React.createElement('line', {
            style: {shapeRendering: 'crispEdges', opacity: '1', stroke: props.tickStroke}, x2,
            y2
          }),
          React.createElement(
            'text',
            Object.assign({
              strokeWidth: '0.01',
              dy,
              x: x1 || 0,
              y: y1 || 0,
              style: {fontSize: 9, stroke: props.tickTextStroke, fill: props.tickTextStroke},
              textAnchor
            }, optionalTextProps),
            tickFormat(tick)
          )
        );
      })
    );
  }
});
