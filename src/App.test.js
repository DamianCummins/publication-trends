import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Header Bar', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Publication Trends/i);
  expect(linkElement).toBeInTheDocument();
});
