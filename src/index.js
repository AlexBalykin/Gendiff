import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';

export default (data1, data2) => {
  const file1 = parse(fs.readFileSync(path.resolve(data1), 'utf8'),
    path.extname(data1).slice(1));
  const file2 = parse(fs.readFileSync(path.resolve(data2), 'utf8'),
    path.extname(data2).slice(1));

  const unionKeys = _.union(_.keys(file1), _.keys(file2));

  const dif = unionKeys.sort().map((key) => {
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (!_.has(file2, key) && _.has(file1, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (_.isEqual(file2[key], file1[key])) {
      return `    ${key}: ${file2[key]}`;
    }
    return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  });
  const result = `{\n${dif.join('\n')}\n}`;

  return result;
};
