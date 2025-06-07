const { test, expect } = require('@jest/globals');

const { copy } = require('../../util');
const { settingsAreValid } = require('..');

test('validate schema', () => {
  const example = {
    shortcuts: {
      add: '+',
      subtract: '-',
      equal: false
    },
    "night-mode": true
  };

  const good = {
    shortcuts: {
      add: 'a',
      subtract: 's',
      equal: true
    },
    "night-mode": false
  };

  const wrongType = copy(good);
  wrongType['night-mode'] = "true";

  const addedKey = copy(good);
  addedKey.new = "dogs";

  const missingKey = copy(good);
  delete missingKey['night-mode'];

  expect(settingsAreValid(good, example)).toBe(true);
  expect(settingsAreValid(wrongType, example)).toBe(false);
  expect(settingsAreValid(addedKey, example)).toBe(false);
  expect(settingsAreValid(missingKey, example)).toBe(false);
});
