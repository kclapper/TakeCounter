import React from 'react';
import ReactDOM from 'react-dom/client';
import renderer from 'react-test-renderer';

import App from './App';

it('Renders without exception', () => {
  const div = document.createElement('div');
  ReactDOM.createRoot(div).render(<App />);
});

it('Matches snapshot', () => {
  const tree = renderer
        .create(<App />)
        .toJSON();
  expect(tree).toMatchSnapshot();
});
