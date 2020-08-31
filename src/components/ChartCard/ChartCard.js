import React from 'react';
import { Tile } from 'carbon-components-react';

const ChartCard = (props) => {
  const { title, children } = props;
  return (
    <Tile className="chart-card">
      <h3>{title}</h3>
      <div className="chart">
        {children}
      </div>
    </Tile>
  );
};

export default ChartCard;
