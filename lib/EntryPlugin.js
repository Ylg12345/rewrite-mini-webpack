const path = require('path');

class EntryPlugin {
  constructor({ entry }) {
    this.entry = entry;
  }

  apply(compiler) {
    compiler.hooks.make.tapAsync('EntryPlugin', (compilation, callback) => {
      const moduleQueue = [];
      const visitedAsset = {};

      const entryModule = compilation.buildModule(this.entry);
      moduleQueue.push(entryModule);

      for(let i = 0; i < moduleQueue.length; i++) {
        const module = moduleQueue[i];

        module.dependencies.forEach(dependency => {

          const childDependency = path.resolve(path.dirname(this.entry), dependency);

          if(visitedAsset[childDependency]) {
            const sameModule = moduleQueue.find((item) => item.filename === childDependency);
            module.mapping[dependency] = sameModule.id;
          } else {
            const childModule = compilation.buildModule(childDependency);
            module.mapping[dependency] = childModule.id;
            visitedAsset[childDependency] = childModule.id;
            moduleQueue.push(childModule);
          }
        });
      }

      compilation.graph = moduleQueue;

      callback();
    })
  }
}

module.exports = EntryPlugin;