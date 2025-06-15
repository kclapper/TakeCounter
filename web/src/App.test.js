import React from 'react';
import { render } from '@testing-library/react';
import { expect, it } from '@jest/globals';

import App from './App';

it('Matches snapshot', () => {
  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
