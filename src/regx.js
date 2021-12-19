/*
 * interface RegX {
 *   _value: string
 * }
 *
 * Always return a RegX interface or a function that returns a RegX interface.
 */

// Utils
function group(value, name) {
    return `(?${name ? `<${name}>` : ":"}${value})`;
}

function makeThen(value) {
    return function (regx, name = null) {
        const newValue = group(`${value}${regx._value}`, name);

        return {
            _value: newValue,
            then: makeThen(newValue),
            test: makeTest(newValue, "igm"),
            testMatchCase: makeTest(newValue, "gm"),
        };
    };
}

function makeTest(value, flags) {
    return function (testString) {
        const regExp = new RegExp(value, flags);
        return regExp.test(testString);
    };
}

function escapeRegExp(string) {
    // Copied from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function makeTextRegX(value) {
    return {
        _value: value,
        or: function (orValue) {
            return makeTextRegX(value + "|" + escapeRegExp(orValue));
        },
    };
}

// Groups and ranges
function startWith(regx, name = null) {
    const value = `^${group(regx._value, name)}`;

    return {
        _value: value,
        then: makeThen(value),
        test: makeTest(value, "igm"),
        testMatchCase: makeTest(value, "gm"),
    };
}

function endWith(regx, name = null) {
    const value = `(${group(regx._value, name)})$`;

    return {
        _value: value,
    };
}

function text(value) {
    return makeTextRegX(escapeRegExp(value));
}

// Character classes
function anyChar() {
    return {
        _value: ".",
    };
}

function anyCharExcept(...chars) {
    return {
        _value: `[^${chars.join("")}]`,
    };
}

// Quantifiers
function zeroOrMore(regx) {
    return {
        _value: `${regx._value}*`,
    };
}

function oneOrMore(regx) {
    return {
        _value: `${regx._value}+`,
    };
}

function zeroOrOne(regx) {
    return {
        _value: `${regx._value}?`,
    };
}

function nTimes(nTimes) {
    return function (regx) {
        return {
            _value: `${regx._value}{${nTimes}}`,
        };
    };
}

function nTimesOrMore(nTimes) {
    return function (regx) {
        return {
            _value: `${regx._value}{${nTimes},}`,
        };
    };
}

function nTimesToMTimes(fromTimes, toTimes) {
    return function (regx) {
        return {
            _value: `${regx._value}{${fromTimes},${toTimes}}`,
        };
    };
}

module.exports = {
    startWith,
    text,
    anyCharExcept,
    anyChar,
    endWith,
    zeroOrMore,
    oneOrMore,
    zeroOrOne,
    nTimes,
    nTimesOrMore,
    nTimesToMTimes,
};
