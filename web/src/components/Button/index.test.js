import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from '@jest/globals';

import Button from './index';

function matchSnapshot(comp) {
  const tree = renderer.create(comp).toJSON();
  expect(tree).toMatchSnapshot();
}

function setup(comp) {
  return {
    user: userEvent.setup(),
    ...render(comp)
  };
}

it('Renders with no props', () => {
  matchSnapshot(<Button />)
});

it('Renders with text child', () => {
  matchSnapshot(<Button>
                  Click Me!
                </Button>)
});

it('Renders tooltip', async () => {
  const {
    getByText,
    findByText,
  } = setup(<Button tooltip='test'>
              Click Me!
            </Button>);

  fireEvent.mouseOver(getByText('Click Me!'));

  expect(await findByText('test')).toBeVisible();
});
