import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Header Bar', () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Publication Trends/i);
  expect(linkElement[0]).toBeInTheDocument();
});
