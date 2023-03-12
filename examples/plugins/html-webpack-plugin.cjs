const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


class HtmlWebpackPlugin {
  constructor(options) {
    const { filename, title } = options || {};
    this.filename = filename || 'index.html';
    this.title = title || '';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('HtmlWebpackPlugin', (compilation, callback) => {
      const templatePath = path.resolve(__dirname, './htmlTemplate.ejs');
      const outputPath = path.join(compilation.output.path, this.filename);
      const htmlOptions = {
        title: this.title,
        outputFilename: compilation.output.filename,
      };

      const template = fs.readFileSync(templatePath, {
        encoding: 'utf-8',
      });

      const code = ejs.render(template, {
        data: htmlOptions
      });

      fs.writeFileSync(outputPath, code);
      callback();
    })
  }
}

module.exports = HtmlWebpackPlugin