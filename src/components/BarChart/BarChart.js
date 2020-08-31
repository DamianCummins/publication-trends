import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

// margin convention often used with D3
const margin = {
  top: 60, right: 60, bottom: 60, left: 60,
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    windowWidth: width,
    windowHeight: height,
  };
};

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const color = ['#f05440', '#d5433d', '#b33535', '#283250'];

const BarChart = ({ data }) => {
  const d3svg = useRef(null);
  const { windowHeight, windowWidth } = useWindowDimensions();
  const width = (windowWidth <= 1000 ? windowWidth : 1000) - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  useEffect(() => {
    select(d3svg.current).selectAll('*').remove();
    if (data && d3svg.current) {
      let svg = select(d3svg.current);

      // scales
      const yMax = max(data, (d) => d.count);

      const yScale = scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

      const xScale = scaleBand()
        .domain(data.map((d) => d.year))
        .rangeRound([0, width])
        .paddingInner(0.25);

      // append group translated to chart area
      svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

      // draw bars
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', (d) => yScale(d.count))
        .attr('x', (d) => xScale(d.year))
        .attr('height', (d) => height - yScale(d.count))
        .attr('width', xScale.bandwidth())
        .style('fill', (d, i) => color[i % 4]);

      // draw axes
      const xAxis = axisBottom(xScale);
      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height + margin.bottom / 3})`)
        .call(xAxis);

      const yAxis = axisLeft(yScale).tickSize(0);
      svg
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${-margin.left / 3},0)`)
        .call(yAxis);
    }
  }, [data]);

  return (
    <svg
      className="bar-chart-container"
      width={width + margin.top + margin.bottom}
      height={height + margin.top + margin.bottom}
      role="img"
      ref={d3svg}
    />
  );
};

export default BarChart;

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
