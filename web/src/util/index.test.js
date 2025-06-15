import { expect, it } from '@jest/globals';
import { getValidatedCount } from '.';

it('tries to validate wrong type', () => {
    let result = getValidatedCount("some string");
    expect(result).toBe(1n);

    result = getValidatedCount(true); 
    expect(result).toBe(1n);

    result = getValidatedCount(false); 
    expect(result).toBe(1n);

    result = getValidatedCount([]);
    expect(result).toBe(1n);

    result = getValidatedCount({});
    expect(result).toBe(1n);

    result = getValidatedCount(undefined);
    expect(result).toBe(1n);

    result = getValidatedCount(null);
    expect(result).toBe(1n);
});

it('validates correct numbers', () => {
    let result = getValidatedCount(1);
    expect(result).toBe(1n);

    result = getValidatedCount(2);
    expect(result).toBe(2n);

    result = getValidatedCount(1n);
    expect(result).toBe(1n);

    result = getValidatedCount(10);
    expect(result).toBe(10n);

    result = getValidatedCount(10n);
    expect(result).toBe(10n);
});

it('validates incorrect numbers', () => {
    let result = getValidatedCount(-10);
    expect(result).toBe(1n);

    result = getValidatedCount(-10n);
    expect(result).toBe(1n);

    result = getValidatedCount(0);
    expect(result).toBe(1n);

    result = getValidatedCount(0n);
    expect(result).toBe(1n);

    result = getValidatedCount(2.5);
    expect(result).toBe(1n);
});