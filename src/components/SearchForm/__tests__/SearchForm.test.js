import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from '../SearchForm';

test('renders Search form', () => {
  const { getByText } = render(<SearchForm />);
  const searchElement = getByText(/Search Term/i);
  expect(searchElement).toBeInTheDocument();
  const selectItem1 = getByText(/Past 5 years/i);
  expect(selectItem1).toBeInTheDocument();
  const selectItem2 = getByText(/2010 - present/i);
  expect(selectItem2).toBeInTheDocument();
  const buttonElement = getByText(/Submit/i);
  expect(buttonElement).toBeInTheDocument();
});
