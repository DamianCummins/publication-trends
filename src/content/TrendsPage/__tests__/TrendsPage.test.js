import React from 'react';
import { render } from '@testing-library/react';
import { TrendsPage } from '../TrendsPage';

test('renders Trends Page', () => {
  const { getByText } = render(<TrendsPage />);
  const searchElement = getByText(/Search Term/i);
  expect(searchElement).toBeInTheDocument();
  const selectElement = getByText(/Select/i);
  expect(selectElement).toBeInTheDocument();
  const chartTitleElement = getByText(/Trends per Year/i);
  expect(chartTitleElement).toBeInTheDocument();
});
