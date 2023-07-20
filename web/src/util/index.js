export * from '@common/util';

export function setMinimum(fn, min = 1) {
  return (arg) => {
    if (arg < min) {
      arg = min;
    }
    fn(arg);
  };
}

export function setEquals(one, two) {
  if (one.size !== two.size) {
    return false;
  }
  for (const item of one) {
    if (!two.has(item)) {
      return false;
    }
  }
  return true;
}
