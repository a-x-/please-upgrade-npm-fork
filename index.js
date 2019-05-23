'use strict'
/* eslint no-process-exit: 0 */
var semver = require('semver')
var npmVersion = require('child_process').execSync('npm --version', {encoding:'utf8'}).trim()

module.exports = function pleaseUpgradeNpm(pkg, opts) {
  opts = opts || {}
  var requiredVersion = pkg.engines.npm
  if (!semver.satisfies(npmVersion, pkg.engines.npm)) {
    if (opts.message) {
      console.error(opts.message(requiredVersion))
    } else {
      console.error(
        pkg.name +
          ' requires ' +
          requiredVersion +
          'version of npm, please upgrade'
      )
    }

    if (opts.hasOwnProperty('exitCode')) {
      process.exit(opts.exitCode)
    } else {
      process.exit(1)
    }
  }
}
