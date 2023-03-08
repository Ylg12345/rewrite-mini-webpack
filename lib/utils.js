const parseBabel = require('@babel/parser');
const traverse = require('@babel/traverse');
const { transformFromAst } = require('babel-core');


function parse(sourceCode) {

  const dependencies = [];

  const ast = parseBabel.parse(sourceCode, {
    sourceType: 'module',
  });

  traverse.default(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value);
    }
  })

  const { code } = transformFromAst(ast, null, {
    presets: ['env'],
  });

  return {
    code,
    dependencies,
  }
}

module.exports = {
  parse
}