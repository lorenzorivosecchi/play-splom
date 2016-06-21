import React, { Component } from 'react';
import h from 'react-hyperscript';
import connect from '../utils/reduxers';
import ScatterPlots from '../components/ScatterPlots';
import ScatterPlotsActivePoints from '../components/ScatterPlotsActivePoints';
import ScatterPlotsInteractive from '../components/ScatterPlotsInteractive';
import * as _ from 'lodash';

import {
  getPointsForPlot,
  getLayout,
  getNumFeatures,
  getDatasetMetadata
} from '../selectors/index';


class ScatterPlotsContainer extends Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    dataset: React.PropTypes.object,
    features: React.PropTypes.array.isRequired,
    layout: React.PropTypes.object.isRequired,
    numFeatures: React.PropTypes.number.isRequired
  };

  render() {
    const padding = this.props.layout.scatterPlotsMargin;
    const props = _.pick(this.props, [
      'dataset',
      'features',
      'layout',
      'numFeatures'
    ]);

    props.height = this.props.height - (padding * 2);
    props.width = this.props.width - (padding * 2);

    const plots = h(ScatterPlots, props);

    const activePoints = h(ScatterPlotsActivePoints);

    const surface = h(ScatterPlotsInteractive, props);

    return h(
      'g',
      {
        height: props.height,
        width: props.width,
        transform: `translate(${padding}, ${padding})`,
      },
      [
        plots,
        activePoints,
        surface
      ]
    );

  }
}

export default connect({
  dataset: getDatasetMetadata,
  features: getPointsForPlot,
  layout: getLayout,
  numFeatures: getNumFeatures
})(ScatterPlotsContainer);
