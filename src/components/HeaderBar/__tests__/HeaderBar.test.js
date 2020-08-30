import React from 'react';
import { render } from '@testing-library/react';
import HeaderBar from '../HeaderBar';

test('renders Publication Trends header', () => {
  const { getByText } = render(<HeaderBar />);
  const linkElement = getByText(/Publication Trends/i);
  expect(linkElement).toBeInTheDocument();
  const subtitleElement = getByText(/Explore/i);
  expect(subtitleElement).toBeInTheDocument();
});
