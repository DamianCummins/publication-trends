import React, { useState, useEffect, useRef } from 'react';

import * as d3 from 'd3';
import { max } from 'd3-array';

const TimeSeriesChart = (props) => {
  const { data, size } = props;
  const d3Container = useRef(null);

  useEffect(() => {
    const [width, height] = size;
    const margin = ({
      top: 20, right: 30, bottom: 34, left: 0,
    });
    console.log(width, height);
    console.log(data);
    if (data && data.length && d3Container.current) {
      d3.select(d3Container.current).selectAll("*").remove();
      const svg = d3.select(d3Container.current);
      svg.selectAll("rect").remove();
      const dataMax = max(data, (d) => d.count);
      const yScale = d3.scaleLinear()
        .domain([0, dataMax])
        .range([margin.left, width - margin.right]);
      const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
        .range([margin.left, width - margin.right]);

      const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0));

      const yAxis = g => g
        .text("Count")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(height / 40));

      svg.append('g')
        .call(xAxis);

      svg.append('g')
        .call(yAxis);

      const group = svg.append('g');

      const rect = group.selectAll('rect');
      console.log(data);
      let countPath = `M${xScale(data[0].year)},${yScale(data[0].count)}`;

      data.slice(1, data.length).forEach((year) => {
        console.log(xScale(year.year));
        countPath += `L${xScale(year.year)},${yScale(year.count)}`;
      });
      console.log(countPath);

      svg.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', countPath);
    }
  }, [data]);

  return (
    <svg
      className="d3-component"
      ref={d3Container}
      width={500}
      height={500}
    />
  );
};
export default TimeSeriesChart;
