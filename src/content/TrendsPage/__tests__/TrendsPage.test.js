import React from 'react';
import { render } from '@testing-library/react';
import TrendsPage from '../TrendsPage';

test('renders Trends Page', () => {
  const { getByText } = render(<TrendsPage />);
  const linkElement = getByText(/Trends Page/i);
  expect(linkElement).toBeInTheDocument();
});
