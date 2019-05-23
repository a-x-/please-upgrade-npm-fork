# Please upgrade npm

> supporting semver checking, forked from please-upgrade-node-fork@3.2.2

> :information_desk_person: show a message to your users to upgrade npm instead of a stacktrace


It's common for new Node users to miss or not understand engines warning when installing a CLI. This package displays a beginner-friendly message if their npm version is below the one expected.

```sh
$ npm -v
5.1.1

$ modern-cli
modern-cli requires 6 version of npm, please upgrade
```

## Usage

```sh
npm install please-upgrade-npm
```

Add `please-upgrade-npm` at the top of your CLI

```js
#!/usr/bin/env node
const pkg = require('./package.json')
require('please-upgrade-npm')(pkg) // <- Must run BEFORE requiring any other modules

// ...
```

Set in your `package.json` the required Node version

```js
{
  "engines": {
    "npm": ">=6"
  }
}
```


## Options

You can set custom `exitCode` and `message` function if needed

```js
pleaseUpgradeNpm(pkg, {
  exitCode: 0, // Default: 1
  message: function(requiredVersion) {
    return 'Oops this program require npm ' +  requiredVersion
  }
})
```

__Important__: to keep `message` function compatible with older versions of Node, avoid using ES6 features like `=>` or string interpolation.
