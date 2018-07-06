'use strict'
/* eslint no-process-exit: 0 */
var semver = require('semver')

module.exports = function pleaseUpgradeNode(pkg, opts) {
  var opts = opts || {}
  var requiredVersion = pkg.engines.node.replace('>=', '')
  var currentVersion = process.version.replace('v', '')
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    if (opts.message) {
      console.error(opts.message(requiredVersion))
    } else {
      console.error(
        pkg.name +
          ' requires at least version ' +
          requiredVersion +
          ' of Node, please upgrade'
      )
    }

    if (opts.hasOwnProperty('exitCode')) {
      process.exit(opts.exitCode)
    } else {
      process.exit(1)
    }
  }
}
