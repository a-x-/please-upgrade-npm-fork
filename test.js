var tape = require('tape')
var pleaseUpgrade = require('./')

Object.defineProperty(process, "version", { value: "v4.5.6" });

var count = 0;

// Mock process.exit and console.error
var exitCode = null
process.exit = function(code) {
  exitCode = code
}

var errorMessage = null
consoleError = console.error
console.error = function(msg) {
  errorMessage = msg
  consoleError(msg)
}

function test(name, cb) {
  // Before each
  exitCode = null
  errorMessage = null
  // Test
  tape(name, cb)
}

// Should not call process.exit
function assertOK(version) {
  pleaseUpgrade({
    name: "Lorem Ipsum",
    engines: {
      node: version
    }
  });
  countShouldBe(0);
}

assertOK(">=1.2.0");
assertOK(">=4.0.0");
assertOK(">=4.0");
assertOK(">=4");

assertOK(">3");
assertOK(">4.4");
assertOK(">4.5.5");

assertOK("~4.5.5");
assertOK("~4.5");
assertOK("~4");

assertOK("^4.5.5");
assertOK("^4");

// Should call process.exit
function assertNotOK(version) {
  count = 0;
  pleaseUpgrade({
    name: "Lorem Ipsum",
    engines: {
      node: version
    }
  });
  countShouldBe(1);
}


assertNotOK(">=6.0.0");
assertNotOK(">=8");

assertNotOK(">5");

assertNotOK("~4.5.7");
assertNotOK("~4.6");
assertNotOK("~5");

assertNotOK("^4.5.7");
assertNotOK("^4.6");
assertNotOK("^5");
