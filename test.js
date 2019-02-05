'use strict'

var assert = require('assert')
var pleaseUpgrade = require('./')

Object.defineProperty(process, 'version', { value: 'v4.5.6' })

var count = 0

process.exit = function() {
  count = count + 1
}

function countShouldBe(expected) {
  assert.strictEqual(count, expected)
}

// Should not call process.exit
function assertOK(version) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: version
    }
  })
  countShouldBe(0)
}

assertOK('>=1.2.0')
assertOK('>=4.0.0')
assertOK('>=4.0')
assertOK('>=4')

assertOK('>3')
assertOK('>4.4')
assertOK('>4.5.5')

assertOK('~4.5.5')
assertOK('~4.5')
assertOK('~4')

assertOK('^4.5.5')
assertOK('^4')

// Should call process.exit
function assertNotOK(version) {
  count = 0
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: version
    }
  })
  countShouldBe(1)
}

assertNotOK('>=6.0.0')
assertNotOK('>=8')

assertNotOK('>5')

assertNotOK('~4.5.7')
assertNotOK('~4.6')
assertNotOK('~5')

assertNotOK('^4.5.7')
assertNotOK('^4.6')
assertNotOK('^5')
