;(function(modules) {

  let cache = {};

  function require(id) {
    const [fn, mapping] = modules[id];

    if (cache[id]) {
      return cache[id].exports;
    }

    const module = {
      exports: {}
    };

    function localRequire(path) {
      const id = mapping[path];

      return require(id);
    }

    cache[id] = module;

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);

})({
  0: [
    function(require, module, exports) {
      const { foo } = require('./foo.js');

      foo();
      console.log('main.js');
    },
    {
      './foo.js': 1
    }
  ],
  1: [
    function(require, module, exports) {
      function foo() {
        console.log('foo.js');
      }

      module.exports = {
        foo,
      }
    },
    {}
  ]
});