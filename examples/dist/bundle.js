;(function(modules) {

  function require(id) {
    const [fn, mapping] = modules[id];
    
    const module = {
      exports: {}
    };

    function localRequire(filePath) {
      const id = mapping[filepath];

      return require(id);
    }

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  
    0: [
      function(require, module, exports) {
        "use strict";

var _foo = require("./foo.js");

var _test = require("./nest/test.js");

(0, _foo.foo)();
console.log('main.js');
      },
      {"./foo.js":1,"./nest/test.js":2}
    ],
  
    1: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

function foo() {
  (0, _bar.bar)();
  console.log('foo.js');
}
      },
      {"./bar.js":3}
    ],
  
    2: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;

function test() {
  console.log('test');
}
      },
      {}
    ],
  
    3: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log('bar');
}
      },
      {}
    ],
  
})