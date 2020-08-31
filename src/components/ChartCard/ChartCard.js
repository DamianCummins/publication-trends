import React from 'react';
import { Tile } from 'carbon-components-react';

const ChartCard = (props) => {
  const { title, children } = props;
  return (
    <Tile>
      <h3>{title}</h3>
      {children}
    </Tile>
  );
};

export default ChartCard;
