import React from 'react';
import { render } from '@testing-library/react';
import BarChart from '../BarChart';

test('renders Bar Chart', () => {
  const utils = render(<BarChart data={[{ year: 2020, count: 10 }, { year: 2019, count: 50 }]} />);
  const yearOnXAxis = utils.getByText(/2020/i);
  expect(yearOnXAxis).toBeInTheDocument();
  const countOnYAxis = utils.getByText(/10/i);
  expect(countOnYAxis).toBeInTheDocument();
  const secondYearOnXAxis = utils.getByText(/2019/i);
  expect(secondYearOnXAxis).toBeInTheDocument();
  const secondCountOnYAxis = utils.getByText(/50/i);
  expect(secondCountOnYAxis).toBeInTheDocument();
});
