

const storedValues = new Map();

export function setValueWithExpiration(key: string, value: number, expirationTimeInMinutes: number) {
    const expirationTimestamp = Date.now() +  expirationTimeInMinutes * 60 * 1000;
    storedValues.set(key, {
        phone: key,
        SMSCode: value,
        expirationTimestamp: expirationTimestamp,
    });
    console.log("storedValues", storedValues);
}
export function getValue(key: string) {
    const storedValue = storedValues.get(key);
    if (storedValue) {
        const currentTime = Date.now();
        if (currentTime <= storedValue.expirationTimestamp) {
            return storedValue;
        } else {
            storedValues.delete(key);
        }
    }
    return null;
}
