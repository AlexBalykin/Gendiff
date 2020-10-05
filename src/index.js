import _ from 'lodash';
import path from 'path';
import { parcerJson, parcerYml, parcerIni } from './parsers';

export default (data1, data2) => {
  let file1 = '';
  let file2 = '';

  if (path.extname(data1) === '.json') {
    file1 = parcerJson(data1);
  }
  if (path.extname(data2) === '.json') {
    file2 = parcerJson(data2);
  }
  if (path.extname(data1) === '.yml') {
    file1 = parcerYml(data1);
  }
  if (path.extname(data2) === '.yml') {
    file2 = parcerYml(data2);
  }
  if (path.extname(data1) === '.ini') {
    file1 = parcerIni(data1);
  }
  if (path.extname(data2) === '.ini') {
    file2 = parcerIni(data2);
  }

  const unionKeys = _.union(_.keys(file1), _.keys(file2));

  const dif = unionKeys.sort().map((keys) => {
    if (!_.has(file1, keys) && _.has(file2, keys)) {
      return `+ ${keys}: ${file2[keys]}`;
    }
    if (!_.has(file2, keys) && _.has(file1, keys)) {
      return `- ${keys}: ${file1[keys]}`;
    }
    if (file2[keys] === file1[keys]) {
      return `  ${keys}: ${file2[keys]}`;
    }
    const dif1 = `- ${keys}: ${file1[keys]}\n+ ${keys}: ${file2[keys]}`;
    return [dif1];
  });
  const result = `{\n${dif.join('\n')}\n}`;

  console.log(result);
  return result;
};
