'use strict';

const { test, expect } = require('@jest/globals');

const { copy, deepFreeze, bigIntMax, setEquals, setJoin } = require('../index.js');

test('copy object', () => {
  const someObject = {
    dog: "Spot",
    age: 7
  };

  expect(copy(someObject)).toEqual(someObject);
  expect(Object.is(copy(someObject), someObject)).toBe(false);
});

test('deep freeze', () => {
  const frozen = deepFreeze({
    test: {
      another: "5"
    }
  });

  expect(() => {
    frozen.test.another = 5;
  }).toThrow();
});

test('big int max', () => {
  expect(bigIntMax(1n, 3n, 2n)).toBe(3n);
});

test('setEquals', () => {
  const twin1 = new Set([1, 2, 3]);
  const twin2 = new Set([1, 2, 3]);
  const other = new Set(['cow', 'bread', 'farm']);

  expect(setEquals(twin1, twin2)).toBe(true);
  expect(setEquals(twin1, other)).toBe(false);
});

test('setJoin', () => {
  expect(setJoin(new Set(['Alt', 'Shift', 'Plus']), '+'))
    .toBe("Alt+Shift+Plus");
});
