export function headerToUrlString(header) {
    const splitString = header.split(' ').map(value => toLowercase(value))
    const joinedString = splitString.join('-')
    return joinedString;
}

export function toLowercase(string) {
    if (typeof string === 'string')
        return string.toLowerCase()
    else {
        return string.toString().toLowerCase();
    };
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }