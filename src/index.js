import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';

const gendiff = (data1, data2) => {
  const file1 = parse(
    fs.readFileSync(path.resolve(data1), 'utf8'),
    path.extname(data1).slice(1)
  );
  const file2 = parse(
    fs.readFileSync(path.resolve(data2), 'utf8'),
    path.extname(data2).slice(1)
  );

  const tree = getAst(file1, file2);

  const diff = (obj) => {
    const space = '  ';
    const keys = Object.keys(obj);

    const result = keys.flatMap((i) => {
      if (typeof obj[i] === 'object') {
        diff(obj[i]);
      }

      if (obj[i] === 'added') {
        console.log(`${space.repeat(3)}+ ${obj.key}:`, obj.value);
      }
      if (obj[i] === 'removed') {
        console.log(`${space.repeat(3)}- ${obj.key}:`, obj.value);
      }
      if (obj[i] === 'unchanged') {
        console.log(`${space.repeat(3)}  ${obj.key}:`, obj.value);
      }
      if (obj[i] === 'head') {
        console.log(`${space.repeat(2)}${obj.key}: {`);
      }
      if (obj[i] === 'changed') {
        console.log(`${space.repeat(3)}- ${obj.key}:`, obj.oldValue);
        console.log(`${space.repeat(3)}+ ${obj.key}:`, obj.newValue);
      }
    });
  };
  diff(tree);
};
console.log(gendiff('q.json', 'w.json'));
