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

export function calcTextWidth(str, min = 0) {
  if (typeof min !== 'number') {
    min = String(min).length;
  }
  str = String(str);

  const letterFactor = 0.68;
  const numberFactor = 1;

  let acc = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (48 <= charCode && charCode <= 57) {
      acc += numberFactor;
    } else {
      acc += letterFactor;
    }
  }

  return Math.max(acc, min) + "ch";
}
