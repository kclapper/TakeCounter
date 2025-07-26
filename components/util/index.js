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
