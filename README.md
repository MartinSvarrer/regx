# regx

A human readable RegExp builder for JavaScript.

NOTE: This is just a simple prototype/concept.

Example Regx:

```js
const urlValidation = startWith(text("http").or("https").or("ftp"))
    .then(text("://"))
    .then(endWith(oneOrMore(anyCharExcept(" ", '"'))));

console.assert(urlValidation.test("http://www.google.com"));
```

vs RegExp:

```js
const simpleUrlValidation = /^(ftp|http|https):\/\/[^ "]+$/;
console.assert(urlValidation.test("http://www.google.com"));
```

You can also assign parts of the regx to make it even more readable:

```js
const space = " ";
const doubleQuote = '"';
const knownProtocolName = text("http").or("https").or("ftp");
const freeOfSpacesAndDoubleQuotes = oneOrMore(
    anyCharExcept(space, doubleQuote)
);

const urlValidation = startWith(knownProtocolName)
    .then(text("://"))
    .then(endWith(freeOfSpacesAndDoubleQuotes));

console.assert(urlValidation.test("http://www.google.com"));
```
