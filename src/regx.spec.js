const { startWith, text, nonOf, anyChar, maybe, endWith } = require('./regx');

/*
  URL validation regex
  @^(https?|ftp)://[^\s/$.?#].[^\s]*$@
*/
var regx = startWith(text('http')
    .or('https')
    .or('ftp'))
  .then(text('://'))
  .then(nonOf('\s/$.?#'))
  .then(anyChar())
  .then(endWith(maybe(nonOf('\s'))));

console.log(regx.test('http://somethingsare.dk/awesome'));