const fs = require('fs');
const { parse } = require('./utils.js');

let ID = 0;

class Compilation {
  constructor({ module, output }) {

    this.loaders = module.rules;
    this.output = output;
    this.graph = [];
  }

  buildModule(filename) {
    let sourceCode = fs.readFileSync(filename, {
      encoding: 'utf-8'
    });

    if(Array.isArray(this.loaders)) {
      this.loaders.forEach((loader) => {
        const { test, use } = loader;

        const loaderContext = {
          addDeps(dep) {
            console.log('addDeps', dep);
          },
        }

        if(test.test(filename)) {
          if(Array.isArray(use)) {
            use.traverse().forEach((fn) => {
              sourceCode = fn.call(loaderContext, sourceCode)
            })
          } else {
            sourceCode = use.call(loaderContext, sourceCode);
          }
        }
      });
    }

    const { code, dependencies } = parse(sourceCode);

    return {
      id: ID++,
      mapping: {},
      dependencies,
      filename,
      code
    }
  }
} 

module.exports ={
  Compilation,
}