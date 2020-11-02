import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';
import getFormat from './formatters/index.js';

const getPath = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');
const getExtname = (filePath) => path.extname(filePath).slice(1);

export default (filePath1, filePath2, format = 'stylish') => {
  const data1 = parse(getPath(filePath1), getExtname(filePath1));
  const data2 = parse(getPath(filePath2), getExtname(filePath2));
  const tree = getAst(data1, data2);

  return getFormat(tree, format);
};
