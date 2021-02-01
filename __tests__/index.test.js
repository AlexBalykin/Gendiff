import path from 'path';
import { promises as fs } from 'fs';
import gendiff from '../src/index.js';

const getPath = (filename) => path.join('__tests__', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file3.yml', 'file4.yml', 'plain', 'plain.txt'],
  ['file5.ini', 'file6.ini', 'json', 'json.txt'],
])('%s', async (filename1, filename2, formatter, equal) => {
  const data1 = getPath(filename1);
  const data2 = getPath(filename2);
  const equalFormat = await fs.readFile(getPath(equal), 'utf8');
  expect(gendiff(data1, data2, formatter)).toEqual(equalFormat);
});
