# import-scan

[![npm](https://img.shields.io/npm/v/import-scan.svg)](https://www.npmjs.com/package/import-scan)
[![Build status](https://travis-ci.org/aleclarson/import-scan.svg?branch=master)](https://travis-ci.org/aleclarson/import-scan)
[![codecov](https://codecov.io/gh/aleclarson/import-scan/branch/master/graph/badge.svg)](https://codecov.io/gh/aleclarson/import-scan)
[![Bundle size](https://badgen.net/bundlephobia/min/import-scan)](https://bundlephobia.com/result?p=import-scan)
[![Install size](https://packagephobia.now.sh/badge?p=import-scan)](https://packagephobia.now.sh/result?p=import-scan)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

Tiny `import` scanner

### Features

- string literals only
- supports `import` statements, `require()` calls, and `import()` calls
- avoids several edge cases (see the tests)

### Usage

```js
import {importScan} from 'import-scan'

let imported = importScan(code)
```
