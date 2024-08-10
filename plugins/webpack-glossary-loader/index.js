const store = import('@grnet/terminology-store');
const path = import('path');
const parseMDModule = require('parse-md');

module.exports = async function(source) {
  const parseMD = parseMDModule.default || parseMDModule;
  const urls = store.terms;
  const importStatement = `
import Glossary from "${ this.query.glossaryComponentPath || "@grnet/docusaurus-glossary-view"}";
  `;
  this.cacheable(false)
  this.addDependency(path.posix.join(this.query.docsDir, 'glossary.json'))
  this.emitFile(
    path.posix.join(this.query.docsDir, 'glossary.json'),
    JSON.stringify(store.terms)
  )
  const { content } = parseMD(source);
  source = source.replace(content, importStatement + content);
  source += `

  <Glossary />

  `;

  return source;
};
