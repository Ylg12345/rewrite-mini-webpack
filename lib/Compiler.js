const { AsyncSeriesHook, SyncHook, AsyncParallelHook } = require("tapable");
const ejs = require('ejs');
const fs = require('fs');
const { Compilation } = require('./Compilation.js');
const EntryPlugin = require('./EntryPlugin.js');
const path = require("path");

class Compiler {
  constructor(config) {
    this.entry = config.entry;
    this.output = config.output;
    this.module = config.module;
    this.plugins = config.plugins;

    this.hooks = {
      compilation: new SyncHook(['compilation']),
      make: new AsyncParallelHook(['compilation']),
      emit: new AsyncSeriesHook(['compilation']),
      afterEmit: new AsyncSeriesHook(['compilation']),
    }

    this.initPlugins();
  }

  initPlugins() {
    const compiler = this;

    if(Array.isArray(this.plugins)) {
      this.plugins.forEach(plugin => {
        if(typeof plugin === 'function') {
          plugin.call(compiler, compiler);
        } else {
          plugin.apply(compiler);
        }
      });

      new EntryPlugin({
        entry: this.entry,
      }).apply(compiler);
    }
  }

  run() {
    const compilation = new Compilation({
      module: this.module,
      output: this.output,
    });

    this.hooks.compilation.call(compilation);

    this.hooks.make.callAsync(compilation, () => {
      console.log('make 钩子')
    });

    this.hooks.emit.callAsync(compilation, () => {
      console.log('emit 钩子');
    });

    this.emitAssets(compilation);

    this.hooks.afterEmit.callAsync(compilation, () => {
      console.log('afterEmit 钩子');
    })
  }

  emitAssets(compilation) {

    const fullpath = path.join(this.output.path, this.output.filename);
    const templatePath = path.resolve(__dirname, './template.ejs');

    const modules = compilation.graph.reduce((pre, cur) => {
      pre[cur.id] = {
        code: cur.code,
        mapping: cur.mapping
      }

      return pre;
    }, {})

    const template = fs.readFileSync(templatePath, {
      encoding: 'utf-8',
    });

    const code = ejs.render(template, {
      data: modules
    });
    
    fs.writeFileSync(fullpath, code);
  }
}

module.exports = {
  Compiler
}