# lightdash

> A lightweight TypeScript utility library inspired by lodash.

## Introduction

Lightdash is an extensive collection of utility functions written in TypeScript, designed to be lightweight and modern.
It's heavily inspired by lodash and underscore, but with the goal to be tiny and as fast as possible.
It is completely written from scratch with the latest ES8+ features.

**[Docs](https://felixrilling.github.io/lightdash/)**

## Differences from lodash

Pros:

*   Written in TypeScript, built-in TypeScript definitions.
*   Smaller fil sizes, both when using the full build and when tree-shaking.
*   Makes use of the latest ECMAScript/TypeScript features.

Cons:

*   No support for legacy browsers.

## Usage

Installation:

```shell
npm install lightdash
```

Importing the modules you want from the file fitting your environment (`lightdash.esm.js` for ES modules or `lightdash.common.js` for commonjs/node) is highly recommended to drastically reduce file size by only including the functions actually needed.

When using ES Modules:

```typescript
import { arrDifference } from "lightdash";

arrDifference([1, 2, 3], [1, 3]);
```

When using Node/CommonJS:

```typescript
const { arrDifference } = require("lightdash");

arrDifference([1, 2, 3], [1, 3]);
```

If you use lightdash directly in the browser, use the exposed `_l` variable

```typescript
_l.arrDifference([1, 2, 3], [1, 3]);
```

## Contributing

Contributions are always welcome, no matter if you have a requests, an idea, found a bug, or spotted a typo: Feel free to create a PR or open an issue!

## Migrating

### v8.x -> v9.x

Breaking:

- Merged arrRemoveItem and arrRemoveItemFirst
- Removed isArguments and isNull
- Removed numSum, numMedian and numAverage
- Removed fnCurry
- Removed hasPath
