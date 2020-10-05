import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (json1, json2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), json1), 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), json2), 'utf8'));

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
