export function isValidCount(rawCount) {
    let asBigInt;
    try {
        asBigInt = BigInt(rawCount);
    } catch {
        return false;
    }

    if (asBigInt <= 0n) {
        return false;
    }

    return true;
}

export function getValidatedCount(rawCount) {
    if (!isValidCount(rawCount)) {
        return 1n;
    }
    return BigInt(rawCount);
}
