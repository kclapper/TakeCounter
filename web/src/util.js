import { useEffect, useCallback } from 'react';

export function setMinimum(fn, min = 1) {
  return (arg) => {
    if (arg < min) {
      arg = min;
    }
    fn(arg);
  };
}

export function useKeyHandler(keyHandler) {
  const handler = useCallback(keyHandler, [keyHandler]);
    useEffect(() => {
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [handler]);
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
