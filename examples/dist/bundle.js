;(function(modules) {

  function require(id) {
    const [fn, mapping] = modules[id];

    const module = {
      exports: {},
    }

    function localRequire(filePath) {
      const id = mapping[filePath];
      return require(id);
    }

    fn(localRequire, module, module.exports)

    return module.exports;
  }

  require(0);
})({
  
    0: [function(require, module, exports) {
      "use strict";

var _foo = require("./foo.js");

var _test = require("./nest/test.js");

var _user = require("../static/user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _foo.foo)();
console.log('main.js');
console.log(JSON.parse(_user2.default));
    }, {"./foo.js":1,"./nest/test.js":2,"../static/user.json":3}],
  
    1: [function(require, module, exports) {
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
    }, {"./bar.js":4}],
  
    2: [function(require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;

function test() {
  console.log('test');
}
    }, {}],
  
    3: [function(require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\r\n  \"name\": \"ylg\",\r\n  \"age\": 24,\r\n  \"career\": \"Front End\"\r\n}";
    }, {}],
  
    4: [function(require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log('bar');
}
    }, {}],
  
})