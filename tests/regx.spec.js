const {
    startWith,
    text,
    anyCharExcept,
    oneOrMore,
    endWith,
} = require("../src/regx");
const { regXTester } = require("./regXTester");

/*
  URL validation regex from https://stackoverflow.com/a/15734347
  /^(ftp|http|https):\/\/[^ "]+$/
*/
const space = " ";
const doubleQuote = '"';
const knownProtocolName = text("http").or("https").or("ftp");
const freeOfSpacesAndDoubleQuotes = oneOrMore(
    anyCharExcept(space, doubleQuote)
);

const urlExpr = () =>
    startWith(knownProtocolName)
        .then(text("://"))
        .then(endWith(freeOfSpacesAndDoubleQuotes));

const testUrlExpr = regXTester(urlExpr);

testUrlExpr("http://www.google.com", true);
testUrlExpr("http://en.wikipedia.org/wiki/Þ", true);
testUrlExpr("http://例え.テスト/", true);
testUrlExpr("http://www.google.com", true);
testUrlExpr("http://www.goo le.com", false);
testUrlExpr("http:www.google.com", false);
