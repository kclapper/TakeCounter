
// const { copy, deepFreeze, bigIntMax, setEquals, setJoin } = require('../index.js');
import { expect, it, test } from '@jest/globals';
import {
    getValidatedCount,
    copy,
    deepFreeze,
    bigIntMax,
    setEquals,
    setJoin
} from './index';

it('tries to validate wrong type', () => {
    let result = getValidatedCount("some string");
    expect(result).toBe(1);

    result = getValidatedCount(true); 
    expect(result).toBe(1);

    result = getValidatedCount(false); 
    expect(result).toBe(1);

    result = getValidatedCount([]);
    expect(result).toBe(1);

    result = getValidatedCount({});
    expect(result).toBe(1);

    result = getValidatedCount(undefined);
    expect(result).toBe(1);

    result = getValidatedCount(null);
    expect(result).toBe(1);
});

it('validates correct numbers', () => {
    let result = getValidatedCount(1);
    expect(result).toBe(1);

    result = getValidatedCount(2);
    expect(result).toBe(2);

    result = getValidatedCount(1);
    expect(result).toBe(1);

    result = getValidatedCount(10);
    expect(result).toBe(10);

    result = getValidatedCount(10);
    expect(result).toBe(10);
});

it('validates incorrect numbers', () => {
    let result = getValidatedCount(-10);
    expect(result).toBe(1);

    result = getValidatedCount(-10n);
    expect(result).toBe(1);

    result = getValidatedCount(0);
    expect(result).toBe(1);

    result = getValidatedCount(0n);
    expect(result).toBe(1);

    result = getValidatedCount(2.5);
    expect(result).toBe(1);
});

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
