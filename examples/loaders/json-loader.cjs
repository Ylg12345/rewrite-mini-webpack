function jsonLoader(source) {

  this.addDeps("jsonLoader");

  const value = typeof source === "string" ? JSON.stringify(source) : source;

  return `export default ${value}`;
}

module.exports = jsonLoader;