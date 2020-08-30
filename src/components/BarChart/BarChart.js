import React, { useState, useEffect, useRef } from 'react';

import * as d3 from 'd3';
import { max } from 'd3-array';

const BarChart = (props) => {
  const { data, size } = props;
  const d3Container = useRef(null);

  useEffect(() => {
    const [width, height] = size;
    const margin = ({
      top: 20, right: 30, bottom: 34, left: 0,
    });

    if (data && data.length && d3Container.current) {
      d3.select(d3Container.current).selectAll('*').remove();
      const svg = d3.select(d3Container.current);
      svg.selectAll('rect').remove();
      const dataMax = max(data, (d) => d.count);

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
      const y = d3.scaleLinear()
        .range([height, 0]);

      svg.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          `translate(${margin.left},${margin.top})`);

      x.domain(data.map((d) => d.year));
      y.domain([0, d3.max(data, (d) => d.count)]);

      // append the rectangles for the bar chart
      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('color', 'steel blue')
        .attr('x', (d) => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.count))
        .attr('height', (d) => height - y(d.count));

      // add the x Axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // add the y Axis
      svg.append('g')
        .call(d3.axisLeft(y));
    }
  }, [data, size]);

  return (
    <svg
      className="d3-component"
      ref={d3Container}
      width={500}
      height={500}
    />
  );
};
export default BarChart;
