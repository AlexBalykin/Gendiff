import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';
import getFormat from './formatters/index.js';

export default (data1, data2, format = 'stylish') => {
  const file1 = parse(
    fs.readFileSync(path.resolve(data1), 'utf8'),
    path.extname(data1).slice(1),
  );
  const file2 = parse(
    fs.readFileSync(path.resolve(data2), 'utf8'),
    path.extname(data2).slice(1),
  );

  const tree = getAst(file1, file2);

  return getFormat(tree, format);
};
