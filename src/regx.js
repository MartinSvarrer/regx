// helpers
function then(value) {
    return function (regx) {
        const newValue = `(${value}${regx._value})`;

        return {
            _value: newValue,
            then: then(newValue),
            test: test(newValue, 'igm'),
            testMatchCase: test(newValue, 'gm'),
        }
    }
}

function test(value, flags) {
    return function (testString) {
        const regExp = new RegExp(value, flags);
        return regExp.test(testString);
    }
}

// exports
function startWith(regx) {
    const value = `^(${regx._value})`;

    return {
        _value: value,
        then: then(value),
    };
}

function endWith(regx) {
    const value = `(${regx._value})$`;

    return {
        _value: value,
    };
}

function text(value) {
    return {
        _value: value,
        or: function (orValue) {
            return text(value + '|' + orValue);
        }
    }
}

function nonOf(chars) {
    return {
        _value: `[^${chars}]`,
    }
}

function anyChar() {
    return {
        _value: '.',
    }
}

function maybe(regx) {
    return {
        _value: regx._value + '*',
    }
}

module.exports = { startWith, text, nonOf, anyChar, maybe, endWith };
