export function isValidCount(rawCount) {
    rawCount = Number(rawCount);
    const isInt = Number.isInteger(rawCount);
    const greaterThanZero = rawCount > 0;
    return isInt && greaterThanZero;
}

export function getValidatedCount(rawCount) {
    if (!isValidCount(rawCount)) {
        return 1;
    }
    return Number(rawCount);
}

export function copy(o) {
  return Object.assign({}, o);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
export function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function bigIntMax(...args) {
  let max = args[0];
  for (let i = 1; i < args.length; i++) {
    if (args[i] > max) {
      max = args[i];
    }
  }
  return max;
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

export function setJoin(set, char) {
  if (set.size === 0) {
    return '';
  }

  let result = '';
  for (const key of set) {
    result += char;
    result += key;
  }

  return result.slice(1);
}