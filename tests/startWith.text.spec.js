const { startWith, text } = require("../src/regx");
const { regXTester } = require("./regXTester");

// Test normal text
const startWithHttp = () => startWith(text("http"));
const testStartWithHttp = regXTester(startWithHttp);
testStartWithHttp("http://www.dr.dk", true);
testStartWithHttp("http", true);
testStartWithHttp("https", true);
testStartWithHttp("htp://www.dr.dk", false);
testStartWithHttp("htt", false);

// Test this or that text
const startWithHttpOrHttps = () => startWith(text("http").or("https"));
const testStartWithHttpOrHttps = regXTester(startWithHttpOrHttps);
testStartWithHttpOrHttps("http://www.dr.dk", true);
testStartWithHttpOrHttps("https://www.dr.dk", true);
testStartWithHttpOrHttps("htp://www.dr.dk", false);
testStartWithHttpOrHttps("htt", false);

// Test escaping character classes properly
const startWithDot = () => startWith(text(".y"));
const testStartWithDot = regXTester(startWithDot);
testStartWithDot(".yes", true);
testStartWithDot("my", false);
testStartWithDot("ay", false);
testStartWithDot("yes", false);
testStartWithDot("No.", false);

const startWithEscapeD = () => startWith(text(String.raw`\d`));
const testStartWithEscapeD = regXTester(startWithEscapeD);
testStartWithEscapeD(String.raw`\dHello`, true);
testStartWithEscapeD(String.raw`\d123`, true);
testStartWithEscapeD(String.raw`Hello`, false);
testStartWithEscapeD(String.raw`Something\dSomething`, false);
