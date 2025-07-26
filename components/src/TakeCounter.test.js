import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { expect, it } from '@jest/globals';

import TakeCounter from './TakeCounter';

it('Matches snapshot', async () => {
  const { asFragment } = render(<TakeCounter />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});
