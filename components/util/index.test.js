import { expect, it } from '@jest/globals';
import { getValidatedCount } from '.';

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