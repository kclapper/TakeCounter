import React from 'react';
import { useCallback } from 'react';

import { TextItem } from './TextItem';

export function IntegerItem({ name, value, onChange, children }) {
  const handleChange = useCallback((input) => {
    if (input.trim() === '') {
      return;
    }

    let number;
    try {
      number = Number(input);
    } catch {
      return;
    }

    if (!Number.isInteger(number)) {
      return;
    }

    onChange(number);
  }, [onChange]);

  return (
    <TextItem name={ name }
              value={ value }
              onChange={ handleChange }>
      { children }
    </TextItem>
  );
}
