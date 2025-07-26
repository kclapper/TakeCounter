import React from 'react';
import { render } from '@testing-library/react';
import { expect, it } from '@jest/globals';

import TakeCounter from './TakeCounter';

it('Matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
