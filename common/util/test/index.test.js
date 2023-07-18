const { copy } = require('../index.js');

test('copy object', () => {
  const someObject = {
    dog: "Spot",
    age: 7
  };

  expect(copy(someObject)).toEqual(someObject);
  expect(Object.is(copy(someObject), someObject)).toBe(false);
});
