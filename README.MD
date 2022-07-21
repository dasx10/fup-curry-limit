# CurryLimit
## install

`npm i --save fup-curry-limit`


## Use

```
const curryLimit = require('fup-curry-limit');```

or es module

import curryLimit from 'fup-curry-limit';
```


## Example

```
const only2Curry = curryLimit(2);         // ((...arguments) => result) => (y, x) => result | (y) => (x) => result
const add        = (y, x) => x + y;       // (y, x) => x + y
const result     = only2Curry(add, 1, 2); // 3
const add1       = only2Curry(add, 1);    // (x) => x + 1
const resultAdd1 = add1(3);               // 4
const addC       = only2Curry(add);       // (y, x) => x + y | (y) => (x) => x + y
const add4       = addC(4);               // (x) => x + 4
const resultAdd4 = add4(5);               // 9

```
