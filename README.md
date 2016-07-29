# regx
A human readable search pattern builder

following regx:

```js
var regx = startWith(text('http').or('https'))
  .then(text('://'))
  .then(nonOf('\s/$.?#'))
  .then(anyChar())
  .then(endWith(maybe(nonOf('\s'))));
```

is the equivalent of:

`^(https?|ftp)(://)([^\s/$.?#])(.)([^\s]*$)`
