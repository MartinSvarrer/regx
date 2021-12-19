function regXTester(regXFactory) {
    const regX = regXFactory();

    return function (testString, truthy) {
        console.assert(
            regX.test(testString) === truthy,
            `${regXFactory.name} ${
                truthy ? "should" : "should not"
            } match ${testString}`
        );
    };
}

module.exports = { regXTester };
